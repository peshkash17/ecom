import { loadImage } from "@napi-rs/canvas";
import { readdirSync } from "fs";

const dir = "D:/ecom-poc/public/products";
for (const f of readdirSync(dir).filter((x) => x.endsWith(".png"))) {
  const img = await loadImage(`${dir}/${f}`);
  console.log(f, img.width, img.height);
}
