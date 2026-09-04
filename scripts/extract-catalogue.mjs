import { createCanvas } from "@napi-rs/canvas";
import { mkdirSync, writeFileSync } from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfPath = "D:/ecom-poc/slyde Catalogue (1).pdf";
const outDir = "D:/ecom-poc/public/catalog/pages";
mkdirSync(outDir, { recursive: true });

const loadingTask = getDocument({
  url: pdfPath,
  verbosity: 0,
  isEvalSupported: false,
  useSystemFonts: true,
});
const pdf = await loadingTask.promise;
console.log("pages", pdf.numPages);

const allText = [];

for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const text = await page.getTextContent();
  const lines = text.items
    .map((it) => ("str" in it ? it.str : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  allText.push(`--- PAGE ${i} ---\n${lines}`);

  const viewport = page.getViewport({ scale: 1.2 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");
  await page.render({ canvasContext: ctx, viewport }).promise;
  writeFileSync(`${outDir}/page-${String(i).padStart(2, "0")}.png`, canvas.toBuffer("image/png"));
  console.log("rendered", i, "textLen", lines.length);
}

writeFileSync("D:/ecom-poc/public/catalog/text.txt", allText.join("\n\n"));
console.log("done");
