/**
 * Generates favicon ICO/PNG and PWA icons in `public/icons` from `public/images/brand/prologue-logo.webp`.
 * Optional: run after swapping the prologue/nav logo asset. Customer-provided packs can also be copied directly into `public/icons/`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "icons");
const svgPath = path.join(__dirname, "brand-source.svg");
const rasterLogoPath = path.join(root, "public", "images", "brand", "prologue-logo.webp");

function sourcePipeline(buf) {
  return sharp(buf);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  let input;
  try {
    await fs.access(rasterLogoPath);
    input = await fs.readFile(rasterLogoPath);
  } catch {
    console.warn("generate-brand-icons: using brand-source.svg (prologue-logo.webp not found)");
    input = await fs.readFile(svgPath);
  }

  const pngBuffers = [];
  for (const s of [16, 32, 48]) {
    pngBuffers.push(
      await sourcePipeline(input)
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    );
  }
  const ico = await toIco(pngBuffers);
  await fs.writeFile(path.join(outDir, "favicon.ico"), ico);

  for (const [name, s] of [
    ["favicon-16x16.png", 16],
    ["favicon-32x32.png", 32],
    ["taqueria-ibarra-192x192.png", 192],
    ["taqueria-ibarra-512x512.png", 512],
  ]) {
    const buf = await sourcePipeline(input)
      .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(outDir, name), buf);
  }

  const manifest = {
    name: "Taqueria Ibarra Food Truck",
    short_name: "Taqueria Ibarra",
    icons: [
      {
        src: "/icons/taqueria-ibarra-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/taqueria-ibarra-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#c41e1e",
    background_color: "#1a1a1a",
    display: "standalone",
  };
  await fs.writeFile(
    path.join(outDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
  );

  console.log("Wrote Taqueria Ibarra icons to public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
