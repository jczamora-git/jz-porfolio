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
const devPage = join(outDir, "development", "index.html");
const notFoundPage = join(outDir, "404.html");

const devSlugs = [
  "sk-balite-plus",
  "learnmca",
  "lrms",
  "vaultify",
  "jeizi-ocr",
  "autosnap",
  "retrv",
];

const homeExists = existsSync(homePage);
const galleryExists = existsSync(galleryPage);
const devExists = existsSync(devPage);
const notFoundExists = existsSync(notFoundPage);

console.log(`[Route] Home page (out/index.html): ${homeExists ? "PASS" : "FAIL"}`);
console.log(`[Route] Gallery page (out/gallery/index.html): ${galleryExists ? "PASS" : "FAIL"}`);
console.log(`[Route] Development page (out/development/index.html): ${devExists ? "PASS" : "FAIL"}`);
console.log(`[Route] 404 page (out/404.html): ${notFoundExists ? "PASS" : "FAIL"}`);

if (!homeExists || !galleryExists || !devExists) {
  console.error("FAIL: Essential primary routes are missing from out/");
  process.exit(1);
}

for (const slug of devSlugs) {
  const caseStudyPath = join(outDir, "development", slug, "index.html");
  const exists = existsSync(caseStudyPath);
  console.log(`[Route] Case study (${slug}): ${exists ? "PASS" : "FAIL"}`);
  if (!exists) {
    console.error(`FAIL: Missing case study route for ${slug} at ${caseStudyPath}`);
    process.exit(1);
  }
}

// 2. Inspect generated HTML for unwanted server-only optimizer references
const homeHtml = readFileSync(homePage, "utf-8");
const galleryHtml = readFileSync(galleryPage, "utf-8");
const devHtml = readFileSync(devPage, "utf-8");

const serverImagePattern = /_next\/image\?url=/;
const homeHasServerImage = serverImagePattern.test(homeHtml);
const galleryHasServerImage = serverImagePattern.test(galleryHtml);
const devHasServerImage = serverImagePattern.test(devHtml);

console.log(`[Images] Home HTML avoids /_next/image optimizer: ${!homeHasServerImage ? "PASS" : "FAIL"}`);
console.log(`[Images] Gallery HTML avoids /_next/image optimizer: ${!galleryHasServerImage ? "PASS" : "FAIL"}`);
console.log(`[Images] Development HTML avoids /_next/image optimizer: ${!devHasServerImage ? "PASS" : "FAIL"}`);

if (homeHasServerImage || galleryHasServerImage || devHasServerImage) {
  console.error("FAIL: Static export still references server-side /_next/image optimizer endpoint");
  process.exit(1);
}

// 3. Confirm representative images exist in out/
const representativeImages = [
  "jeizi-logo.png",
  "jeizi-zamora.png",
  "jeizi-zamora.webp",
  "projects/shirt-preview.png",
  "projects/shirt-preview.webp",
  "dev/sk-balite-plus-standee.png",
  "dev/learn-mca.png",
  "dev/lrms-dev.png",
  "dev/vaultify-app.png",
  "dev/jeizi-ocr.png",
  "dev/auto-snap.png",
  "dev/retrv-app.png",
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
