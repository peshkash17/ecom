import { createCanvas, loadImage } from "@napi-rs/canvas";
import { writeFileSync } from "fs";

const img = await loadImage("D:/ecom-poc/public/products/raw/club-tee.png");
const box = { x: 78, y: 132, w: 980, h: 1095 };
const outW = 1200;
const outH = 1500;
const canvas = createCanvas(outW, outH);
const ctx = canvas.getContext("2d");
const scale = Math.max(outW / box.w, outH / box.h);
const dw = Math.round(box.w * scale);
const dh = Math.round(box.h * scale);
ctx.drawImage(
  img,
  box.x,
  box.y,
  box.w,
  box.h,
  Math.round((outW - dw) / 2),
  Math.round((outH - dh) / 2),
  dw,
  dh
);
writeFileSync(
  "D:/ecom-poc/public/products/hero-campus.jpg",
  canvas.toBuffer("image/jpeg", 0.92)
);
console.log("tight crop written");
