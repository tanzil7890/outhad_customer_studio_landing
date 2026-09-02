/**
 * Zero-dependency frontmatter parser + Markdown renderer.
 *
 * Powers the local blogs content store in `content/blogs`. Deliberately has no
 * npm dependencies so the content pipeline stays build-time only and cannot fail
 * at runtime the way the previous Firestore fetch could.
 *
 * Supported frontmatter (a YAML subset):
 *   key: value                  → string / boolean / null
 *   key: "quoted: value"        → string
 *   key: [one, two]             → string[]
 *   key:                        → string[] (from `- item` lines)
 *     - one
 *   key:                        → Record<string, string>[] (from `- k: v` blocks)
 *     - label: Conversion
 *       value: "+32%"
 *
 * Supported Markdown: ATX headings, paragraphs, thematic breaks, fenced code,
 * blockquotes, nested ordered/unordered lists, pipe tables, images, links,
 * bold/italic/strikethrough/inline code, and raw HTML blocks (passed through so
 * content authored in the old rich-text editor keeps rendering).
 */

export type Frontmatter = Record<string, unknown>

export interface ParsedDocument {
  data: Frontmatter
  body: string
}

// ─── Frontmatter ──────────────────────────────────────────────

const FRONTMATTER_DELIMITER = /^---\s*$/

function stripQuotes(value: string): string {
  const first = value[0]
  const last = value[value.length - 1]
  if (value.length >= 2 && (first === '"' || first === "'") && last === first) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'")
  }
  return value
}

function parseScalar(raw: string): unknown {
  const value = raw.trim()
  if (value === '' || value === 'null' || value === '~') return null
  if (value === 'true') return true
  if (value === 'false') return false

  // Inline array: [one, "two"]
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (inner === '') return []
    return splitInlineList(inner).map((item) => stripQuotes(item.trim()))
  }

  return stripQuotes(value)
}

/** Split `a, "b, c", d` on top-level commas only. */
function splitInlineList(input: string): string[] {
  const items: string[] = []
  let current = ''
  let quote: string | null = null

  for (const char of input) {
    if (quote) {
      if (char === quote) quote = null
      current += char
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === ',') {
      items.push(current)
      current = ''
      continue
    }
    current += char
  }
  if (current.trim() !== '') items.push(current)
  return items
}

const KEY_VALUE = /^(\s*)([A-Za-z0-9_-]+):\s?(.*)$/
const LIST_ITEM = /^(\s*)-\s+(.*)$/

export function parseFrontmatter(raw: string): ParsedDocument {
  const normalized = raw.replace(/\r\n/g, '\n').replace(/^﻿/, '')
  const lines = normalized.split('\n')

  if (!FRONTMATTER_DELIMITER.test(lines[0] ?? '')) {
    return { data: {}, body: normalized.trim() }
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && FRONTMATTER_DELIMITER.test(line))
  if (closingIndex === -1) {
    return { data: {}, body: normalized.trim() }
  }

  const data: Frontmatter = {}
  const block = lines.slice(1, closingIndex)
  let cursor = 0

  while (cursor < block.length) {
    const line = block[cursor]
    if (line.trim() === '' || line.trimStart().startsWith('#')) {
      cursor += 1
      continue
    }

    const match = KEY_VALUE.exec(line)
    if (!match) {
      cursor += 1
      continue
    }

    const [, , key, rawValue] = match
    if (rawValue.trim() !== '') {
      data[key] = parseScalar(rawValue)
      cursor += 1
      continue
    }

    // Empty value → a nested list may follow on more-indented lines.
    const { value, nextCursor } = parseNestedList(block, cursor + 1)
    data[key] = value
    cursor = nextCursor
  }

  return { data, body: lines.slice(closingIndex + 1).join('\n').trim() }
}

function parseNestedList(
  block: string[],
  start: number
): { value: unknown; nextCursor: number } {
  const items: unknown[] = []
  let cursor = start
  let sawItem = false

  while (cursor < block.length) {
    const line = block[cursor]
    if (line.trim() === '') {
      cursor += 1
      continue
    }

    const listMatch = LIST_ITEM.exec(line)
    if (!listMatch) break

    sawItem = true
    const [, indent, content] = listMatch
    const inlineKeyValue = KEY_VALUE.exec(content)
    cursor += 1

    if (!inlineKeyValue) {
      items.push(parseScalar(content))
      continue
    }

    // Map item: collect sibling `key: value` lines indented past the dash.
    const entry: Record<string, unknown> = {
      [inlineKeyValue[2]]: parseScalar(inlineKeyValue[3]),
    }
    const childIndent = indent.length + 2

    while (cursor < block.length) {
      const childLine = block[cursor]
      if (childLine.trim() === '') {
        cursor += 1
        continue
      }
      if (LIST_ITEM.test(childLine)) break

      const childMatch = KEY_VALUE.exec(childLine)
      if (!childMatch || childMatch[1].length < childIndent) break

      entry[childMatch[2]] = parseScalar(childMatch[3])
      cursor += 1
    }

    items.push(entry)
  }

  return { value: sawItem ? items : null, nextCursor: cursor }
}

// ─── Markdown → HTML ──────────────────────────────────────────

const BLOCK_HTML_TAG =
  /^<\/?(?:address|article|aside|blockquote|br|dd|details|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|hr|iframe|img|li|main|nav|ol|p|picture|pre|script|section|source|summary|table|tbody|td|tfoot|th|thead|tr|ul|video)\b/i

const CODE_PLACEHOLDER = '\u0000CODE'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttribute(value: string): string {
  return value.replace(/&(?!(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;').replace(/"/g, '&quot;')
}

/** Inline formatting. Raw HTML is preserved; only code spans are escaped. */
function renderInline(input: string): string {
  const codeSpans: string[] = []

  let text = input.replace(/(`+)([\s\S]*?)\1/g, (_match, _ticks, code: string) => {
    codeSpans.push(`<code>${escapeHtml(code.trim())}</code>`)
    return `${CODE_PLACEHOLDER}${codeSpans.length - 1}\u0000`
  })

  // Images before links — `![alt](src)` shares the link shape.
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_match, alt: string, src: string, title?: string) =>
      `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}"${
        title ? ` title="${escapeAttribute(title)}"` : ''
      } />`
  )

  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_match, label: string, href: string, title?: string) => {
      const external = /^https?:\/\//i.test(href)
      const attrs = [
        `href="${escapeAttribute(href)}"`,
        title ? `title="${escapeAttribute(title)}"` : '',
        external ? 'target="_blank" rel="noopener noreferrer"' : '',
      ]
        .filter(Boolean)
        .join(' ')
      return `<a ${attrs}>${label}</a>`
    }
  )

  text = text
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s).,;:!?])/g, '$1<em>$2</em>')
    .replace(/(^|[\s(])_([^_\n]+)_(?=$|[\s).,;:!?])/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')

  return text.replace(new RegExp(`${CODE_PLACEHOLDER}(\\d+)\\u0000`, 'g'), (_match, index: string) =>
    codeSpans[Number(index)]
  )
}

function slugifyHeading(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isTableDelimiter(line: string | undefined): boolean {
  if (!line) return false
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line)
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

interface ListNode {
  ordered: boolean
  items: { content: string[]; children: ListNode[] }[]
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, '    ')
    .split('\n')

  const html: string[] = []
  let index = 0

  const isBlockBoundary = (line: string | undefined): boolean => {
    if (line === undefined) return true
    const trimmed = line.trim()
    return (
      trimmed === '' ||
      /^#{1,6}\s/.test(trimmed) ||
      /^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed) ||
      /^```/.test(trimmed) ||
      /^>/.test(trimmed) ||
      /^(?:[-*+]\s|\d+[.)]\s)/.test(trimmed) ||
      BLOCK_HTML_TAG.test(trimmed)
    )
  }

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (trimmed === '') {
      index += 1
      continue
    }

    // Fenced code block
    const fence = /^(`{3,}|~{3,})\s*([A-Za-z0-9+#._-]*)\s*$/.exec(trimmed)
    if (fence) {
      const [, marker, language] = fence
      const code: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith(marker)) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      const languageClass = language ? ` class="language-${language}"` : ''
      html.push(`<pre><code${languageClass}>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }

    // Thematic break
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      html.push('<hr />')
      index += 1
      continue
    }

    // ATX heading
    const heading = /^(#{1,6})\s+(.*?)\s*#*$/.exec(trimmed)
    if (heading) {
      const level = heading[1].length
      const content = renderInline(heading[2])
      const id = slugifyHeading(content)
      html.push(`<h${level}${id ? ` id="${id}"` : ''}>${content}</h${level}>`)
      index += 1
      continue
    }

    // Table
    if (trimmed.includes('|') && isTableDelimiter(lines[index + 1])) {
      const header = splitTableRow(trimmed)
      index += 2
      const rows: string[][] = []
      while (index < lines.length && lines[index].trim().includes('|')) {
        rows.push(splitTableRow(lines[index]))
        index += 1
      }
      const headerCells = header.map((cell) => `<th>${renderInline(cell)}</th>`).join('')
      const bodyRows = rows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`)
        .join('')
      html.push(
        `<table><thead><tr>${headerCells}</tr></thead>${bodyRows ? `<tbody>${bodyRows}</tbody>` : ''}</table>`
      )
      continue
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoted: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoted.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }
      html.push(`<blockquote>${renderMarkdown(quoted.join('\n'))}</blockquote>`)
      continue
    }

    // Lists
    if (/^(?:[-*+]\s|\d+[.)]\s)/.test(trimmed)) {
      const { node, nextIndex } = parseList(lines, index)
      html.push(renderList(node))
      index = nextIndex
      continue
    }

    // Raw HTML block — passed through untouched.
    if (BLOCK_HTML_TAG.test(trimmed)) {
      const block: string[] = []
      while (index < lines.length && lines[index].trim() !== '') {
        block.push(lines[index])
        index += 1
      }
      html.push(block.join('\n'))
      continue
    }

    // Paragraph
    const paragraph: string[] = [trimmed]
    index += 1
    while (index < lines.length && !isBlockBoundary(lines[index])) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`)
  }

  return html.join('\n')
}

const LIST_MARKER = /^(\s*)(?:([-*+])|(\d+)[.)])\s+(.*)$/

function parseList(lines: string[], start: number): { node: ListNode; nextIndex: number } {
  const first = LIST_MARKER.exec(lines[start])!
  const baseIndent = first[1].length
  const node: ListNode = { ordered: Boolean(first[3]), items: [] }
  let index = start

  while (index < lines.length) {
    const line = lines[index]
    if (line.trim() === '') {
      // A blank line ends the list unless another item follows.
      const next = lines[index + 1]
      if (!next || !LIST_MARKER.test(next) || LIST_MARKER.exec(next)![1].length < baseIndent) break
      index += 1
      continue
    }

    const match = LIST_MARKER.exec(line)
    if (!match) {
      // Lazy continuation line for the current item.
      if (node.items.length === 0) break
      const indent = line.length - line.trimStart().length
      if (indent < baseIndent + 2) break
      node.items[node.items.length - 1].content.push(line.trim())
      index += 1
      continue
    }

    const indent = match[1].length
    if (indent < baseIndent) break

    if (indent > baseIndent) {
      const nested = parseList(lines, index)
      if (node.items.length === 0) {
        node.items.push({ content: [], children: [] })
      }
      node.items[node.items.length - 1].children.push(nested.node)
      index = nested.nextIndex
      continue
    }

    const ordered = Boolean(match[3])
    if (ordered !== node.ordered) break

    node.items.push({ content: [match[4].trim()], children: [] })
    index += 1
  }

  return { node, nextIndex: index }
}

function renderList(node: ListNode): string {
  const tag = node.ordered ? 'ol' : 'ul'
  const items = node.items
    .map((item) => {
      const content = renderInline(item.content.join(' '))
      const children = item.children.map((child) => renderList(child)).join('')
      return `<li>${content}${children}</li>`
    })
    .join('')
  return `<${tag}>${items}</${tag}>`
}
