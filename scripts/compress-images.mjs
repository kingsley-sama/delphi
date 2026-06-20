// Compress site images to WebP and (optionally) upload them to the public
// `images` Supabase Storage bucket. Run this whenever you add a new image:
//
//   node scripts/compress-images.mjs
//
// Drop new source images into public/images/ as .jpg/.jpeg/.png. They are
// converted to <basename>.webp and referenced in code via img("<basename>.webp").
//
// Uploading: set SUPABASE_UPLOAD_KEY in .env (service_role key recommended — it
// bypasses RLS). Without it, the script only compresses to .tmp/compressed-images/.
// You can also override inline: SUPABASE_UPLOAD_KEY=<key> node scripts/compress-images.mjs
import sharp from "sharp";
import { readdir, mkdir, stat, readFile } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

// Load .env (simple KEY=VALUE parser) so `node scripts/compress-images.mjs`
// picks up SUPABASE_UPLOAD_KEY without an inline env var.
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const SRC = "public/images";
const OUT = ".tmp/compressed-images";
const MAX_WIDTH = 2000;
const QUALITY = 80;
const PROJECT_REF = "lxmbetmjyfagmmuoragm";
const BUCKET = "images";

// Files that stay local (small, used as CSS backgrounds) — never migrated.
const SKIP = new Set(["grid-bg.png"]);

const uploadKey = process.env.SUPABASE_UPLOAD_KEY;

await mkdir(OUT, { recursive: true });

// Recursively collect raster source files under public/images.
async function collect(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collect(full)));
    else if (/\.(jpe?g|png)$/i.test(entry.name) && !SKIP.has(entry.name)) out.push(full);
  }
  return out;
}

const files = await collect(SRC);

const kb = (n) => (n / 1024).toFixed(0) + " KB";
const mb = (n) => (n / 1024 / 1024).toFixed(1) + " MB";

let totalIn = 0;
let totalOut = 0;
let uploaded = 0;
let failed = 0;

for (const inPath of files) {
  const base = path.basename(inPath).replace(/\.(jpe?g|png)$/i, "");
  const outName = `${base}.webp`;
  const outPath = path.join(OUT, outName);

  const inSize = (await stat(inPath)).size;
  await sharp(inPath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);
  const outSize = (await stat(outPath)).size;
  totalIn += inSize;
  totalOut += outSize;

  const pct = (100 - (outSize / inSize) * 100).toFixed(1);
  let status = "";
  if (uploadKey) {
    const url = `https://${PROJECT_REF}.supabase.co/storage/v1/object/${BUCKET}/${outName}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${uploadKey}`,
        apikey: uploadKey,
        "Content-Type": "image/webp",
        "x-upsert": "true",
      },
      body: await readFile(outPath),
    });
    if (res.ok) {
      uploaded++;
      status = " [uploaded]";
    } else {
      failed++;
      status = ` [UPLOAD FAILED ${res.status}]`;
    }
  }
  console.log(`${path.basename(inPath).padEnd(24)} ${mb(inSize).padStart(8)} -> ${kb(outSize).padStart(9)}  (-${pct}%)${status}`);
}

console.log("-".repeat(64));
console.log(`TOTAL ${" ".repeat(18)} ${mb(totalIn).padStart(8)} -> ${kb(totalOut).padStart(9)}  (-${(100 - (totalOut / totalIn) * 100).toFixed(1)}%)`);
if (uploadKey) console.log(`Uploaded: ${uploaded}, failed: ${failed}`);
else console.log("Set SUPABASE_UPLOAD_KEY to also upload to Supabase Storage.");
