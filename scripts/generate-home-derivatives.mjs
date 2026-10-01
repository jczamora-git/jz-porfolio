#!/usr/bin/env node
/**
 * scripts/generate-home-derivatives.mjs
 *
 * Generates lightweight, web-sized WebP derivatives for homepage featured projects.
 * - Caps long edge at 1200–1600px (without upscaling)
 * - Quality 82 (80–85 range)
 * - Preserves aspect ratio and transparency
 * - Skips regeneration if target is up-to-date
 * - Does NOT run during production build
 */

import { readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const projectsDir = join(root, "public", "projects");

const MAX_EDGE = 1600;
const QUALITY = 82;

console.log("=== Homepage Featured Project Derivative Generator ===");
console.log(`Directory: ${projectsDir}`);

if (!existsSync(projectsDir)) {
  console.error(`Error: Directory not found: ${projectsDir}`);
  process.exit(1);
}

const files = readdirSync(projectsDir).filter((f) => f.endsWith(".png"));

if (files.length === 0) {
  console.log("No PNG images found in public/projects.");
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;
let generatedCount = 0;
let skippedCount = 0;

for (const file of files) {
  const srcPath = join(projectsDir, file);
  const srcStat = statSync(srcPath);
  totalBefore += srcStat.size;

  const parsed = parse(file);
  const destPath = join(projectsDir, `${parsed.name}.webp`);

  // Check if target is already up-to-date
  if (existsSync(destPath)) {
    const destStat = statSync(destPath);
    if (destStat.mtimeMs >= srcStat.mtimeMs) {
      console.log(`[UP TO DATE] ${file} -> ${parsed.name}.webp (${destStat.size} bytes)`);
      totalAfter += destStat.size;
      skippedCount++;
      continue;
    }
  }

  // Load and inspect metadata
  const image = sharp(srcPath);
  const meta = await image.metadata();

  const width = meta.width || 0;
  const height = meta.height || 0;
  const shouldResize = width > MAX_EDGE || height > MAX_EDGE;

  let pipeline = image;
  if (shouldResize) {
    pipeline = pipeline.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const webpBuffer = await pipeline
    .webp({
      quality: QUALITY,
      effort: 6,
    })
    .toBuffer();

  const afterSize = webpBuffer.length;
  totalAfter += afterSize;

  await sharp(webpBuffer).toFile(destPath);

  const reduction = ((1 - afterSize / srcStat.size) * 100).toFixed(1);
  console.log(
    `[GENERATED] ${file} (${(srcStat.size / 1024).toFixed(0)} KB, ${width}x${height}) -> ${parsed.name}.webp (${(afterSize / 1024).toFixed(0)} KB) [-${reduction}%]`
  );
  generatedCount++;
}

console.log("\n=== Summary ===");
console.log(`Files processed: ${files.length} (Generated: ${generatedCount}, Up-to-date: ${skippedCount})`);
console.log(`Total Before:    ${(totalBefore / 1024 / 1024).toFixed(2)} MB (${totalBefore} bytes)`);
console.log(`Total After:     ${(totalAfter / 1024 / 1024).toFixed(2)} MB (${totalAfter} bytes)`);
const overallReduction = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(`Net Reduction:   ${overallReduction}% byte savings\n`);
