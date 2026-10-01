import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const outDir = join(root, "out");

console.log("=== Static Output Verification ===");

if (!existsSync(outDir)) {
  console.error("FAIL: out/ directory does not exist. Run 'npm run build' first.");
  process.exit(1);
}

// 1. Verify key routes
const homePage = join(outDir, "index.html");
const galleryPage = join(outDir, "gallery", "index.html");
const notFoundPage = join(outDir, "404.html");

const homeExists = existsSync(homePage);
const galleryExists = existsSync(galleryPage);
const notFoundExists = existsSync(notFoundPage);

console.log(`[Route] Home page (out/index.html): ${homeExists ? "PASS" : "FAIL"}`);
console.log(`[Route] Gallery page (out/gallery/index.html): ${galleryExists ? "PASS" : "FAIL"}`);
console.log(`[Route] 404 page (out/404.html): ${notFoundExists ? "PASS" : "FAIL"}`);

if (!homeExists || !galleryExists) {
  console.error("FAIL: Essential routes are missing from out/");
  process.exit(1);
}

// 2. Inspect generated HTML for unwanted server-only optimizer references
const homeHtml = readFileSync(homePage, "utf-8");
const galleryHtml = readFileSync(galleryPage, "utf-8");

const serverImagePattern = /_next\/image\?url=/;
const homeHasServerImage = serverImagePattern.test(homeHtml);
const galleryHasServerImage = serverImagePattern.test(galleryHtml);

console.log(`[Images] Home HTML avoids /_next/image optimizer: ${!homeHasServerImage ? "PASS" : "FAIL"}`);
console.log(`[Images] Gallery HTML avoids /_next/image optimizer: ${!galleryHasServerImage ? "PASS" : "FAIL"}`);

if (homeHasServerImage || galleryHasServerImage) {
  console.error("FAIL: Static export still references server-side /_next/image optimizer endpoint");
  process.exit(1);
}

// 3. Confirm representative images exist in out/
const representativeImages = [
  "jeizi-logo.png",
  "projects/shirt-preview.png"
];

// If local gallery assets were built into out/, check representative sample
if (existsSync(join(outDir, "gallery"))) {
  representativeImages.push(
    "gallery/shirts/5-1.png",
    "gallery/event/bracket.png",
    "gallery/logo/emerald-harmony-logo.png"
  );
}

for (const img of representativeImages) {
  const imgPath = join(outDir, img);
  const exists = existsSync(imgPath);
  console.log(`[Asset Export] ${img}: ${exists ? "PASS" : "FAIL"}`);
  if (!exists) {
    console.error(`FAIL: Asset ${img} missing in out/`);
    process.exit(1);
  }
}

// 4. Calculate total output size
function getDirSize(dir) {
  let total = 0;
  for (const file of readdirSync(dir)) {
    const full = join(dir, file);
    const s = statSync(full);
    if (s.isDirectory()) {
      total += getDirSize(full);
    } else {
      total += s.size;
    }
  }
  return total;
}

const totalBytes = getDirSize(outDir);
console.log(`[Artifact] Total out/ size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB (${totalBytes} bytes)`);
console.log("=== Static Output Verification Complete: ALL CHECKS PASSED ===");
