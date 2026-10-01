#!/usr/bin/env node
/**
 * scripts/import-drive-manifest.mjs
 *
 * Imports the JSON output from scripts/google-drive-enumerator.gs, validates it
 * against the 79-work collection contract, and updates:
 *   - lib/gallery/drive-files.ts (canonical Drive ID map)
 *   - lib/gallery/manifest.ts (authoritative manifest with provider: "google-drive")
 *
 * Usage:
 *   node scripts/import-drive-manifest.mjs drive-files.json
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const manifestPath = join(root, "lib", "gallery", "manifest.ts");
const driveFilesPath = join(root, "lib", "gallery", "drive-files.ts");

const EXPECTED_TOTAL = 79;
const EXPECTED_CATEGORY_COUNTS = {
  featured: 6,
  event: 10,
  logo: 13,
  print: 9,
  social: 20,
  shirts: 21,
};

const KNOWN_SAMPLE = {
  category: "social",
  filename: "story-2.png",
  expectedFileId: "16z00-J_D9E0-pkscMOmjBKhHfK_miqdX",
};

function printUsage() {
  console.log(`
Usage:
  node scripts/import-drive-manifest.mjs <path-to-drive-files.json>

Example:
  node scripts/import-drive-manifest.mjs drive-files.json
`);
}

const inputArg = process.argv[2];
if (!inputArg) {
  console.error("Error: Missing input file argument.");
  printUsage();
  process.exit(1);
}

const inputPath = resolve(process.cwd(), inputArg);
if (!existsSync(inputPath)) {
  console.error(`Error: File not found at '${inputPath}'.`);
  process.exit(1);
}

console.log("=== Jeizi Portfolio Drive Manifest Importer ===");
console.log(`Reading: ${inputPath}`);

let rawData;
try {
  rawData = readFileSync(inputPath, "utf-8");
} catch (err) {
  console.error(`Failed to read '${inputPath}':`, err.message);
  process.exit(1);
}

let items;
try {
  items = JSON.parse(rawData);
} catch (err) {
  console.error(`Failed to parse JSON in '${inputPath}':`, err.message);
  process.exit(1);
}

if (!Array.isArray(items)) {
  console.error("Error: Input JSON must be an array of objects.");
  process.exit(1);
}

const errors = [];

// 1. Validate Total Count = 79
if (items.length !== EXPECTED_TOTAL) {
  errors.push(
    `Total count mismatch: expected ${EXPECTED_TOTAL} files, but received ${items.length}.`
  );
}

// 2. Validate Category Counts & Collect
const categoryCounts = {};
const seenDriveIds = new Map(); // fileId -> item
const duplicateDriveIds = [];
const seenCategoryFiles = new Set();
const duplicateCategoryFiles = [];

for (const [idx, item] of items.entries()) {
  const desc = `Item #${idx + 1} (${item.category || "unknown"}/${item.filename || "unknown"})`;

  if (!item.category || typeof item.category !== "string") {
    errors.push(`${desc}: missing or invalid 'category'`);
    continue;
  }
  if (!item.filename || typeof item.filename !== "string") {
    errors.push(`${desc}: missing or invalid 'filename'`);
    continue;
  }
  if (!item.fileId || typeof item.fileId !== "string") {
    errors.push(`${desc}: missing or invalid 'fileId'`);
    continue;
  }

  // Tally category
  categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;

  // Check duplicate category + filename
  const catFileKey = `${item.category}/${item.filename}`;
  if (seenCategoryFiles.has(catFileKey)) {
    duplicateCategoryFiles.push(catFileKey);
  } else {
    seenCategoryFiles.add(catFileKey);
  }

  // Check duplicate Drive IDs
  if (seenDriveIds.has(item.fileId)) {
    duplicateDriveIds.push({
      fileId: item.fileId,
      first: seenDriveIds.get(item.fileId),
      second: catFileKey,
    });
  } else {
    seenDriveIds.set(item.fileId, catFileKey);
  }
}

// Check category contract
for (const [cat, expected] of Object.entries(EXPECTED_CATEGORY_COUNTS)) {
  const actual = categoryCounts[cat] || 0;
  if (actual !== expected) {
    errors.push(
      `Category '${cat}' count mismatch: expected ${expected}, got ${actual}.`
    );
  }
}

// Check for unexpected categories
for (const cat of Object.keys(categoryCounts)) {
  if (!(cat in EXPECTED_CATEGORY_COUNTS)) {
    errors.push(`Unexpected category '${cat}' found in Drive enumeration.`);
  }
}

// Check duplicate errors
if (duplicateDriveIds.length > 0) {
  for (const dup of duplicateDriveIds) {
    errors.push(
      `Duplicate Drive file ID '${dup.fileId}' used in both '${dup.first}' and '${dup.second}'.`
    );
  }
}

if (duplicateCategoryFiles.length > 0) {
  for (const dup of duplicateCategoryFiles) {
    errors.push(`Duplicate category + filename combination: '${dup}'.`);
  }
}

// 3. Validate known validation sample (social/story-2.png)
const story2 = items.find(
  (it) => it.category === KNOWN_SAMPLE.category && it.filename === KNOWN_SAMPLE.filename
);
if (!story2) {
  errors.push(
    `Required validation sample '${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename}' is missing from input JSON.`
  );
} else if (story2.fileId !== KNOWN_SAMPLE.expectedFileId) {
  errors.push(
    `Validation sample '${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename}' file ID mismatch: expected '${KNOWN_SAMPLE.expectedFileId}', got '${story2.fileId}'.`
  );
}

// Read current manifest.ts to match entries
if (!existsSync(manifestPath)) {
  errors.push(`Manifest not found at '${manifestPath}'.`);
}

let manifestEntries = [];
let manifestContent = "";
let manifestMatch = null;

if (existsSync(manifestPath)) {
  manifestContent = readFileSync(manifestPath, "utf-8");
  manifestMatch = manifestContent.match(
    /export const galleryManifest:\s*GalleryManifestEntry\[\]\s*=\s*(\[[\s\S]*\]);/
  );
  if (!manifestMatch) {
    errors.push("Could not parse galleryManifest array from lib/gallery/manifest.ts.");
  } else {
    try {
      manifestEntries = JSON.parse(manifestMatch[1]);
    } catch (err) {
      errors.push(`Malformed JSON inside manifest.ts: ${err.message}`);
    }
  }
}

// Match Drive files to manifest entries by category + filename
const driveMap = new Map();
for (const item of items) {
  driveMap.set(`${item.category}/${item.filename}`, item.fileId);
}

const unmatchedManifestEntries = [];

for (const entry of manifestEntries) {
  // If entry.filename exists, use it; otherwise infer filename from entry.id or path
  let fn = entry.filename;
  if (!fn) {
    if (typeof entry.storage === "object" && entry.storage.path) {
      const parts = entry.storage.path.split("/");
      fn = parts[parts.length - 1];
    } else if (entry.id.startsWith(entry.categorySlug + "-")) {
      fn = entry.id.slice(entry.categorySlug.length + 1) + ".png";
    }
  }

  const key = `${entry.categorySlug}/${fn}`;
  if (!driveMap.has(key)) {
    unmatchedManifestEntries.push(
      `Manifest entry '${entry.id}' (${key}) has no matching Drive file.`
    );
  }
}

// Check for Drive files unmatched in manifest
const manifestKeys = new Set(
  manifestEntries.map((e) => {
    let fn = e.filename;
    if (!fn) {
      if (typeof e.storage === "object" && e.storage.path) {
        const parts = e.storage.path.split("/");
        fn = parts[parts.length - 1];
      } else if (e.id.startsWith(e.categorySlug + "-")) {
        fn = e.id.slice(e.categorySlug.length + 1) + ".png";
      }
    }
    return `${e.categorySlug}/${fn}`;
  })
);

const unmatchedDriveFiles = [];
for (const item of items) {
  const key = `${item.category}/${item.filename}`;
  if (!manifestKeys.has(key)) {
    unmatchedDriveFiles.push(`Drive file '${key}' has no matching entry in manifest.`);
  }
}

if (unmatchedManifestEntries.length > 0) {
  for (const err of unmatchedManifestEntries) errors.push(err);
}
if (unmatchedDriveFiles.length > 0) {
  for (const err of unmatchedDriveFiles) errors.push(err);
}

// If errors detected, abort without writing files
if (errors.length > 0) {
  console.error("\n=== IMPORT VALIDATION FAILED ===");
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  console.error(`\nFound ${errors.length} validation error(s). No files were modified.`);
  process.exit(1);
}

console.log("Validation passed successfully!");
console.log(`- Total works: ${items.length} (PASS)`);
console.log(`- Category counts verified:`);
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`  * ${cat}: ${count}`);
}
console.log(`- Sample verification: ${KNOWN_SAMPLE.category}/${KNOWN_SAMPLE.filename} -> ${KNOWN_SAMPLE.expectedFileId} (PASS)`);
console.log(`- All ${items.length} Drive files matched to manifest entries 1-to-1.`);

// 4. Generate lib/gallery/drive-files.ts
const driveFilesObject = {};
// Sort keys deterministically
const sortedKeys = Array.from(driveMap.keys()).sort();
for (const key of sortedKeys) {
  driveFilesObject[key] = driveMap.get(key);
}

const driveFilesContent = `/**
 * Canonical Google Drive file ID mapping for gallery works.
 * Generated by scripts/import-drive-manifest.mjs from Google Apps Script enumeration.
 * Do not edit manually.
 */
export const DRIVE_FILES: Record<string, string> = ${JSON.stringify(driveFilesObject, null, 2)};
`;

writeFileSync(driveFilesPath, driveFilesContent, "utf-8");
console.log(`\nUpdated canonical Drive mapping: ${driveFilesPath}`);

// 5. Update lib/gallery/manifest.ts
for (const entry of manifestEntries) {
  let fn = entry.filename;
  if (!fn) {
    if (typeof entry.storage === "object" && entry.storage.path) {
      const parts = entry.storage.path.split("/");
      fn = parts[parts.length - 1];
    } else if (entry.id.startsWith(entry.categorySlug + "-")) {
      fn = entry.id.slice(entry.categorySlug.length + 1) + ".png";
    }
  }

  const key = `${entry.categorySlug}/${fn}`;
  const fileId = driveMap.get(key);

  entry.filename = fn;
  entry.storage = {
    provider: "google-drive",
    fileId: fileId,
  };
}

const updatedManifestContent = manifestContent.replace(
  manifestMatch[0],
  `export const galleryManifest: GalleryManifestEntry[] = ${JSON.stringify(manifestEntries, null, 2)};`
);

writeFileSync(manifestPath, updatedManifestContent, "utf-8");
console.log(`Updated manifest with verified Drive sources: ${manifestPath}`);

console.log("\n=== IMPORT COMPLETE: 79 works mapped to Google Drive ===");
