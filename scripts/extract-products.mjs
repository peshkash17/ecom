import { createCanvas } from "@napi-rs/canvas";
import { mkdirSync, writeFileSync, copyFileSync } from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfPath = "D:/ecom-poc/slyde Catalogue (1).pdf";
const pagesDir = "D:/ecom-poc/public/catalog/pages";
const productsDir = "D:/ecom-poc/public/products";
mkdirSync(pagesDir, { recursive: true });
mkdirSync(productsDir, { recursive: true });

const productPages = {
  1: "hero.png",
  7: "school-line.png",
  9: "polo.png",
  10: "shirt.png",
  11: "trousers.png",
  13: "skirt.png",
  14: "blazer.png",
  15: "sweater.png",
  16: "hoodie.png",
  17: "house-tee.png",
  18: "sports.png",
  22: "tie.png",
  23: "cap.png",
  24: "bag.png",
  29: "club-tee.png",
  51: "jersey-tee.png",
  53: "polo-alt.png",
};

const loadingTask = getDocument({
  url: pdfPath,
  verbosity: 0,
  isEvalSupported: false,
  useSystemFonts: true,
});
const pdf = await loadingTask.promise;
console.log("pages", pdf.numPages);

for (const [pageNum, file] of Object.entries(productPages)) {
  const i = Number(pageNum);
  const page = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 1.6 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  const pagePath = `${pagesDir}/page-${String(i).padStart(2, "0")}.png`;
  const buf = canvas.toBuffer("image/png");
  writeFileSync(pagePath, buf);
  copyFileSync(pagePath, `${productsDir}/${file}`);
  console.log("rendered", i, "->", file, buf.length);
}

console.log("done");
