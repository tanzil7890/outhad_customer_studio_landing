# Convertive films

Source for the Convertive product films. There are two:

| Film | Output | Length | Idea |
|---|---|---|---|
| **Ghosts** (`--film ghost`, the main one) | `public/videos/convertive-film.mp4` | ~48s | Anonymous visitors are ghosts. One continuous camera move follows a single cursor through the store. Time freezes at the moment she's about to leave, three possible futures appear, one is chosen, and the ghost gets a name. Includes a synthesised score. |
| **47 seconds** (`--film forty-seven`) | `public/videos/convertive-demo.mp4` | ~74s | A straight explainer: phone and panel side by side, scene by scene. |

Scenes are React components drawn as a pure function of the frame number. Headless Chrome screenshots every frame and ffmpeg encodes them, so renders are deterministic. Story numbers come from `../lib/landing/story.ts`, the same data the website uses.

## Requirements

- Node 20+ and pnpm
- ffmpeg on `PATH`
- Google Chrome. The default path is the macOS app; set `CHROME_PATH` to override it.
- Only to regenerate the narration: Python 3.12 with `pip install kokoro-onnx soundfile`, plus the Kokoro model files (see below).

Run `pnpm install --ignore-workspace` once inside `video/`.

## Commands (run inside `video/`)

| Command | What it does |
|---|---|
| `pnpm preview` | Builds and opens the browser preview: film picker, play/pause, scrubber, beat buttons. It plays the audio mix once a render has produced it. Open `.build/index.html?film=ghost` to go straight to Ghosts. |
| `node scripts/stills.mjs --film ghost 12 33.5` | Renders single frames (in seconds) to `out/stills/`. Also takes `--scene <id>` or `--every 3`. |
| `PYTHON=/path/to/venv/bin/python node scripts/render.mjs --film ghost` | Renders `out/convertive-film.mp4`: narration plus a score synthesised by `script/score.py` (needs numpy and soundfile), with the music ducked under the voice. Add `--captioned` for a burned-in-subtitle variant, or `--no-music`. |
| `node scripts/render.mjs` | Renders `out/convertive-demo.mp4` with burned-in subtitles and narration, plus a `.vtt` file and poster. |
| `node scripts/render.mjs --clean` | Also renders `out/convertive-demo-clean.mp4` without subtitles; pair it with the `.vtt` file. |
| `node scripts/render.mjs --publish` | Copies the MP4, VTT and poster into `../public/videos/`. |

## Editing "Ghosts"

- **Words:** narration is in `script/ghost/lines.json`. Regenerate it with `generate_vo.py --film ghost`. Every visual event (freeze, unfreeze, whip, zoom-out) is derived from the narration times in `src/ghost/timeline.ts`, so a re-voiced script re-times itself.
- **Camera:** the camera path is `CAM` in `src/ghost/world.ts`.
- **Cursor:** its path through the store is `PATH`, keyed by session seconds, in the same file.
- **Pinned signals:** `PINS` in the same file.
- **Layers:** `src/ghost/GhostFilm.tsx` (world, cursor, freeze, HUD, captions, money, end card) and `src/ghost/Canvas.tsx` (ghost crowd, session grid).
- **Score:** `script/score.py`. Pads, pulse, whooshes and hits are scheduled from the same timing.

## Editing "47 seconds"

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
