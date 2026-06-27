#!/usr/bin/env bash
# Download assets from Wix CDN into public/images (run once during setup)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/images"
mkdir -p "$DEST"/{hero,logo,partners,press,services}

download() {
  curl -fsSL --max-time 60 "$1" -o "$2"
}

download "https://static.wixstatic.com/media/7b31cc_fe49c2e7630b473e8d84449c6d1cbff0~mv2.webp" "$DEST/hero/hero-bg.webp"
download "https://static.wixstatic.com/media/7b31cc_cbdae83ffa564e8fbbd59fa244f214e4~mv2.png" "$DEST/logo/logo.png"
download "https://static.wixstatic.com/media/7b31cc_3f290f26815c423395e79ac1e23cd835~mv2.png" "$DEST/partners/lvmh.png"
download "https://static.wixstatic.com/media/7b31cc_5335dc34f3034201bd6d9400d69c613d~mv2.png" "$DEST/partners/kering.png"
download "https://static.wixstatic.com/media/7b31cc_7eb4a68e9a2b4c69ad2c2bf1ef849b6b~mv2.png" "$DEST/partners/ey.png"
download "https://static.wixstatic.com/media/7b31cc_919404f1c4d84111a4e2f81add390938~mv2.png" "$DEST/partners/ab-inbev.png"
download "https://static.wixstatic.com/media/7b31cc_b9b79af1d7ea4ba49d4a470045412668~mv2.png" "$DEST/partners/schleich.png"
download "https://static.wixstatic.com/media/7b31cc_89eb6c3c7c91437bb539cf7433884ddd~mv2.png" "$DEST/partners/partner-6.png"
download "https://static.wixstatic.com/media/7b31cc_68d9232e0b1848aaa7281a874b362fd5~mv2.png" "$DEST/partners/partner-7.png"
download "https://static.wixstatic.com/media/7b31cc_0f85d2be6d074486ba27c9229f1c686a~mv2.png" "$DEST/press/forbes.png"
download "https://static.wixstatic.com/media/7b31cc_c76724c8f3af4f7da630bae84f7fe521~mv2.jpg" "$DEST/press/bloomberg.jpg"
download "https://static.wixstatic.com/media/7b31cc_4d436ffed420400ab5c840772eebc71a~mv2.png" "$DEST/press/press-3.png"
download "https://static.wixstatic.com/media/7b31cc_e41b164c29694962883cad52b0a2d88b~mv2.png" "$DEST/press/press-4.png"
download "https://static.wixstatic.com/media/7b31cc_7765bc083f15466d80c6a2c81246f397~mv2.jpg" "$DEST/press/press-5.jpg"
download "https://static.wixstatic.com/media/11062b_375f4f9ec7954c9884524a8488191998~mv2.jpg" "$DEST/services/joint-venture.jpg"
download "https://static.wixstatic.com/media/11062b_a2d71b2a18ce4a33a391b38a5401a82d~mv2.jpg" "$DEST/services/company-building.jpg"
download "https://static.wixstatic.com/media/11062b_bfa9815cbaa74b398b7b1a6688b26dd6~mv2.jpg" "$DEST/services/prototype-production.jpg"
download "https://static.wixstatic.com/media/11062b_e6b991ec32e04648b0d010b3cb335c68~mv2.jpg" "$DEST/services/data-ai.jpg"

cp "$DEST/logo/logo.png" "$ROOT/public/favicon.png"
echo "Images downloaded to $DEST"
