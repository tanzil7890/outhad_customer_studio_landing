"""Generate the voiceover, one WAV per script line, with Kokoro (Apache-2.0).

Usage (from the repo root, in a Python 3.12 venv with `pip install kokoro-onnx soundfile`):

    KOKORO_DIR=/path/to/model-files python video/script/generate_vo.py [--voice af_heart] [--speed 1.0]

KOKORO_DIR must contain kokoro-v1.0.onnx and voices-v1.0.bin from
https://github.com/thewh1teagle/kokoro-onnx/releases (model-files-v1.0).
Writes video/public/vo/<id>.wav and video/script/vo-durations.json, which the
timeline reads to size each scene around its narration. With --film ghost it reads
script/ghost/lines.json and writes public/vo/ghost/ and script/ghost/vo-durations.json.
"""

import argparse
import json
import os
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", default="af_heart")
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--only", help="generate a single line id")
    parser.add_argument("--film", default="forty-seven", choices=["forty-seven", "ghost"])
    args = parser.parse_args()

    script_dir = ROOT / "script" if args.film == "forty-seven" else ROOT / "script" / args.film
    out_dir = ROOT / "public" / "vo" if args.film == "forty-seven" else ROOT / "public" / "vo" / args.film
    lines = json.loads((script_dir / "lines.json").read_text())

    model_dir = Path(os.environ.get("KOKORO_DIR", "."))
    kokoro = Kokoro(str(model_dir / "kokoro-v1.0.onnx"), str(model_dir / "voices-v1.0.bin"))

    out_dir.mkdir(parents=True, exist_ok=True)
    durations_path = script_dir / "vo-durations.json"
    durations = json.loads(durations_path.read_text()) if durations_path.exists() else {}

    for line in lines:
        if args.only and line["id"] != args.only:
            continue
        samples, sample_rate = kokoro.create(line["vo"], voice=args.voice, speed=args.speed, lang="en-us")
        sf.write(out_dir / f"{line['id']}.wav", samples, sample_rate)
        durations[line["id"]] = round(len(samples) / sample_rate, 3)
        print(f"{line['id']:>9}: {durations[line['id']]:.2f}s")

    durations_path.write_text(json.dumps(durations, indent=2) + "\n")


if __name__ == "__main__":
    main()
