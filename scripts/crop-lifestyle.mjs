import { createCanvas, loadImage } from "@napi-rs/canvas";
import { writeFileSync } from "fs";

const img = await loadImage("D:/ecom-poc/public/products/raw/club-tee.png");
const box = { x: 36, y: 118, w: 1000, h: 1178 };
const outW = 1200;
const outH = 1500;
const canvas = createCanvas(outW, outH);
const ctx = canvas.getContext("2d");
const scale = Math.max(outW / box.w, outH / box.h);
const dw = Math.round(box.w * scale);
const dh = Math.round(box.h * scale);
const dx = Math.round((outW - dw) / 2);
const dy = Math.round((outH - dh) / 2);
ctx.drawImage(img, box.x, box.y, box.w, box.h, dx, dy, dw, dh);
writeFileSync("D:/ecom-poc/public/products/club-lifestyle.png", canvas.toBuffer("image/png"));

const hero = createCanvas(1600, 2000);
const hctx = hero.getContext("2d");
const hs = Math.max(1600 / box.w, 2000 / box.h);
hctx.drawImage(
  img,
  box.x,
  box.y,
  box.w,
  box.h,
  Math.round((1600 - box.w * hs) / 2),
  Math.round((2000 - box.h * hs) / 2),
  Math.round(box.w * hs),
  Math.round(box.h * hs)
);
writeFileSync("D:/ecom-poc/public/products/hero.png", hero.toBuffer("image/png"));
console.log("lifestyle + hero written");
