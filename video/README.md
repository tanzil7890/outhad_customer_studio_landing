# Convertive demo film

Source for `public/videos/convertive-demo.mp4`, a ~74-second product film that follows one anonymous shopper ("Sarah") through a 47-second session, with and without Convertive.

Scenes are React components drawn as a pure function of the frame number. Headless Chrome screenshots every frame and ffmpeg encodes them, so every render is deterministic. The story numbers come straight from `../lib/landing/story.ts`, the same data the website uses.

## Requirements

- Node 20+ and pnpm
- ffmpeg on `PATH`
- Google Chrome. The default path is the macOS app; set `CHROME_PATH` to override it.
- Only to regenerate the narration: Python 3.12 with `pip install kokoro-onnx soundfile`, plus the Kokoro model files (see below).

Run `pnpm install --ignore-workspace` once inside `video/`.

## Commands (run inside `video/`)

| Command | What it does |
|---|---|
| `pnpm preview` | Builds and opens the browser preview: play/pause, scrubber, scene buttons. It plays the narration once `out/vo-mix.wav` exists (after a render). |
| `node scripts/stills.mjs 12 33.5` | Renders single frames (in seconds) to `out/stills/`. Also takes `--scene decide` or `--every 3`. |
| `node scripts/render.mjs` | Renders `out/convertive-demo.mp4` with burned-in subtitles and narration, plus a `.vtt` file and poster. |
| `node scripts/render.mjs --clean` | Also renders `out/convertive-demo-clean.mp4` without subtitles; pair it with the `.vtt` file. |
| `node scripts/render.mjs --publish` | Copies the MP4, VTT and poster into `../public/videos/`. |

## Editing

- **Words:** the narration is in `script/lines.json`, one line per scene, in order. Subtitles and the VTT file are generated from it. Regenerate the voice after editing (below); scene lengths follow the new audio automatically.
- **Pacing:** `PADS` in `src/timeline.ts` sets the seconds of picture before and after each narration line.
- **Visuals:** `src/scenes/`:
  - `Problem.tsx`, `Meet.tsx`
  - `Product.tsx`: detect, decide, deliver, convert, without
  - `Closing.tsx`: why, platform, end
- **Shared pieces:** `src/components/` (phone, store screen, Convertive panel, text).
- **Brand colors:** `src/theme.ts`. Copper is for money only.

## Narration

The voice is Kokoro v1.0 (Apache-2.0, free for commercial use), voice `af_heart`. To regenerate:

```bash
# model files: https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
KOKORO_DIR=/path/to/model-files python video/script/generate_vo.py --voice af_heart
```

This writes `public/vo/<scene>.wav` and `script/vo-durations.json`.

To use a human voiceover instead, record one file per line with the same names, update `vo-durations.json` with each file's length in seconds, and re-render.
