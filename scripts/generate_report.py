#!/usr/bin/env python3
"""Copy the bundled template and replace data/briefing.json with input JSON."""
from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a static daily briefing page.")
    parser.add_argument("--input", required=True, help="Path to briefing JSON payload")
    parser.add_argument("--output", required=True, help="Output directory")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(__file__).resolve().parent.parent
    template_dir = root / "shared" / "template-site"
    input_path = Path(args.input).resolve()
    output_dir = Path(args.output).resolve()

    if not input_path.exists():
        raise SystemExit(f"Input file not found: {input_path}")

    with input_path.open("r", encoding="utf-8") as f:
        payload = json.load(f)

    if output_dir.exists():
        shutil.rmtree(output_dir)
    shutil.copytree(template_dir, output_dir)

    target_json = output_dir / "data" / "briefing.json"
    target_json.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Wrote briefing site to: {output_dir}")
    print(f"Open: {output_dir / 'index.html'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
