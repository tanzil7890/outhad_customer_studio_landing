'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { common, createLowlight } from 'lowlight'
import { useCallback } from 'react'

const lowlight = createLowlight(common)

// ─── Icons ────────────────────────────────────────────────────
// Minimal inline SVGs for the toolbar
const Icon = ({ children, ...props }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
)

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your case study...',
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        horizontalRule: false,
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-400 underline' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
      Placeholder.configure({ placeholder }),
      CodeBlockLowlight.configure({ lowlight }),
      Youtube.configure({ width: 640, height: 480 }),
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      HorizontalRule,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[400px] px-6 py-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(() => {
    const url = prompt('Enter image URL:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = prompt('Enter URL:', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addYoutube = useCallback(() => {
    const url = prompt('Enter YouTube URL:')
    if (url && editor) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }, [editor])

  const addTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900">
      {/* ─── Toolbar ─── */}
      <div className="border-b border-zinc-700 bg-zinc-800/50 p-2 flex flex-wrap gap-0.5">
        {/* Text Style Group */}
        <ToolbarGroup>
          <ToolbarSelect
            value={
              editor.isActive('heading', { level: 1 })
                ? 'h1'
                : editor.isActive('heading', { level: 2 })
                ? 'h2'
                : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : editor.isActive('heading', { level: 4 })
                ? 'h4'
                : 'paragraph'
            }
            onChange={(val) => {
              if (val === 'paragraph') editor.chain().focus().setParagraph().run()
              else {
                const level = parseInt(val.replace('h', '')) as 1 | 2 | 3 | 4
                editor.chain().focus().toggleHeading({ level }).run()
              }
            }}
            options={[
              { value: 'paragraph', label: 'Paragraph' },
              { value: 'h1', label: 'Heading 1' },
              { value: 'h2', label: 'Heading 2' },
              { value: 'h3', label: 'Heading 3' },
              { value: 'h4', label: 'Heading 4' },
            ]}
          />
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Formatting Group */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <span className="font-bold text-xs">B</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <span className="italic text-xs">I</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline"
          >
            <span className="underline text-xs">U</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="line-through text-xs">S</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive('highlight')}
            title="Highlight"
          >
            <span className="text-xs bg-yellow-500/30 px-0.5">H</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >
            <span className="text-xs font-mono">{`<>`}</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            active={editor.isActive('superscript')}
            title="Superscript"
          >
            <span className="text-xs">X<sup className="text-[8px]">2</sup></span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            active={editor.isActive('subscript')}
            title="Subscript"
          >
            <span className="text-xs">X<sub className="text-[8px]">2</sub></span>
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Color */}
        <ToolbarGroup>
          <div className="relative">
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              title="Text Color"
            />
          </div>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Alignment Group */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <Icon><line x1="17" x2="3" y1="10" y2="10"/><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="14" y2="14"/><line x1="17" x2="3" y1="18" y2="18"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <Icon><line x1="18" x2="6" y1="10" y2="10"/><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="14" y2="14"/><line x1="18" x2="6" y1="18" y2="18"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <Icon><line x1="21" x2="7" y1="10" y2="10"/><line x1="21" x2="3" y1="6" y2="6"/><line x1="21" x2="3" y1="14" y2="14"/><line x1="21" x2="7" y1="18" y2="18"/></Icon>
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Lists Group */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <Icon><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <Icon><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            active={editor.isActive('taskList')}
            title="Task List"
          >
            <Icon><rect width="6" height="6" x="3" y="5" rx="1"/><path d="m3 17 2 2 4-4"/><line x1="13" x2="21" y1="6" y2="6"/><line x1="13" x2="21" y1="12" y2="12"/><line x1="13" x2="21" y1="18" y2="18"/></Icon>
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Insert Group */}
        <ToolbarGroup>
          <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Link">
            <Icon><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Icon>
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="Image">
            <Icon><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></Icon>
          </ToolbarButton>
          <ToolbarButton onClick={addYoutube} title="YouTube Video">
            <Icon><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></Icon>
          </ToolbarButton>
          <ToolbarButton onClick={addTable} title="Table">
            <Icon><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Icon><line x1="3" x2="21" y1="12" y2="12"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Icon><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Icon><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Icon>
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Table Actions (visible when inside a table) */}
        {editor.isActive('table') && (
          <ToolbarGroup>
            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add Column"
            >
              <span className="text-[10px]">+Col</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Add Row"
            >
              <span className="text-[10px]">+Row</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Delete Column"
            >
              <span className="text-[10px] text-red-400">-Col</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Delete Row"
            >
              <span className="text-[10px] text-red-400">-Row</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
            >
              <span className="text-[10px] text-red-400">Del Table</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().mergeCells().run()}
              title="Merge Cells"
            >
              <span className="text-[10px]">Merge</span>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().splitCell().run()}
              title="Split Cell"
            >
              <span className="text-[10px]">Split</span>
            </ToolbarButton>
          </ToolbarGroup>
        )}

        {/* Undo / Redo */}
        <div className="ml-auto flex gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Icon><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></Icon>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Icon><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>
          </ToolbarButton>
        </div>
      </div>



      {/* ─── Editor Content ─── */}
      <EditorContent editor={editor} />
    </div>
  )
}

// ─── Toolbar Sub-Components ────────────────────────────────────

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        flex items-center justify-center w-7 h-7 rounded transition-colors
        ${active ? 'bg-zinc-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  )
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-zinc-700 mx-1.5" />
}

function ToolbarSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 border-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
