#!/usr/bin/env python3
"""Copy the bundled template, replace data/briefing.json, and inline the payload into the HTML."""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a static daily briefing page.")
    parser.add_argument("--input", required=True, help="Path to briefing JSON payload")
    parser.add_argument("--output", required=True, help="Output directory")
    parser.add_argument("--open", action="store_true", help="Serve via HTTP and open in browser")
    parser.add_argument("--port", type=int, default=8765, help="HTTP server port (default: 8765)")
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

    # Write the JSON data file
    target_json = output_dir / "data" / "briefing.json"
    payload_text = json.dumps(payload, indent=2, ensure_ascii=False)
    target_json.write_text(payload_text + "\n", encoding="utf-8")

    # Inline the JSON into index.html so it works without a server
    index_html = output_dir / "index.html"
    html = index_html.read_text(encoding="utf-8")
    inline_script = f"<script>window.__BRIEFING_DATA__ = {payload_text};</script>"
    html = html.replace("</head>", f"  {inline_script}\n  </head>")
    index_html.write_text(html, encoding="utf-8")

    print(f"Wrote briefing site to: {output_dir}")

    if args.open:
        url = f"http://localhost:{args.port}"
        print(f"Serving at: {url}")
        subprocess.Popen(
            [sys.executable, "-m", "http.server", str(args.port)],
            cwd=str(output_dir),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        subprocess.Popen(["open", url])
    else:
        print(f"Open: {output_dir / 'index.html'}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
