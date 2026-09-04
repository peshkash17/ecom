import { createCanvas, loadImage } from "@napi-rs/canvas";
import { mkdirSync, copyFileSync, existsSync } from "fs";

const srcDir = "D:/ecom-poc/public/products";
const rawDir = "D:/ecom-poc/public/products/raw";
mkdirSync(rawDir, { recursive: true });

const W = 2304;
const H = 1296;

/** Crop boxes on 2304×1296 catalogue pages, then placed on a 4:5 studio canvas. */
const crops = {
  polo: { x: 760, y: 250, w: 980, h: 820 },
  shirt: { x: 760, y: 230, w: 1000, h: 840 },
  trousers: { x: 760, y: 220, w: 980, h: 860 },
  skirt: { x: 760, y: 220, w: 980, h: 860 },
  blazer: { x: 740, y: 210, w: 1020, h: 880 },
  sweater: { x: 740, y: 210, w: 1020, h: 880 },
  hoodie: { x: 700, y: 200, w: 1080, h: 900 },
  "house-tee": { x: 740, y: 220, w: 1000, h: 860 },
  sports: { x: 700, y: 200, w: 1080, h: 900 },
  "club-tee": { x: 0, y: 0, w: 1180, h: 1296 },
  "jersey-tee": { x: 180, y: 80, w: 1880, h: 1160 },
  "polo-alt": { x: 220, y: 80, w: 1860, h: 1160 },
  tie: { x: 700, y: 180, w: 1100, h: 920 },
  cap: { x: 680, y: 180, w: 1120, h: 780 },
  bag: { x: 680, y: 180, w: 1120, h: 900 },
  hero: { x: 0, y: 0, w: 980, h: 1296 },
};

const OUT_W = 960;
const OUT_H = 1200;
const BG = "#eef3f5";
const cover = new Set(["club-tee", "hero"]);

function fit(sw, sh, mode) {
  const pad = mode === "cover" ? 0 : 48;
  const maxW = OUT_W - pad * 2;
  const maxH = OUT_H - pad * 2;
  const scale =
    mode === "cover"
      ? Math.max(maxW / sw, maxH / sh)
      : Math.min(maxW / sw, maxH / sh);
  const dw = Math.round(sw * scale);
  const dh = Math.round(sh * scale);
  return {
    dx: Math.round((OUT_W - dw) / 2),
    dy: Math.round((OUT_H - dh) / 2),
    dw,
    dh,
  };
}

for (const [name, box] of Object.entries(crops)) {
  const srcPath = `${srcDir}/${name}.png`;
  const rawPath = `${rawDir}/${name}.png`;
  if (!existsSync(rawPath) && existsSync(srcPath)) {
    copyFileSync(srcPath, rawPath);
  }
  const img = await loadImage(existsSync(rawPath) ? rawPath : srcPath);
  const canvas = createCanvas(OUT_W, OUT_H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, OUT_W, OUT_H);

  const mode = cover.has(name) ? "cover" : "contain";
  const { dx, dy, dw, dh } = fit(box.w, box.h, mode);
  ctx.drawImage(img, box.x, box.y, box.w, box.h, dx, dy, dw, dh);
  const out = `${srcDir}/${name}.png`;
  const { writeFileSync } = await import("fs");
  writeFileSync(out, canvas.toBuffer("image/png"));
  console.log("cropped", name, box);
}

console.log("done");
