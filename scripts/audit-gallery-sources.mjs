/**
 * Audit tool for gallery assets and migration progress.
 * Has zero third-party dependencies.
 *
 * Re-run with:  npm run gallery:audit
 */
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const manifestPath = join(root, "lib", "gallery", "manifest.ts");

console.log("=== Gallery Storage & Migration Audit ===\n");

if (!existsSync(manifestPath)) {
  console.error("FAIL: lib/gallery/manifest.ts not found.");
  process.exit(1);
}

// Parse manifest from file
const content = readFileSync(manifestPath, "utf-8");
const match = content.match(/export const galleryManifest:\s*GalleryManifestEntry\[\]\s*=\s*(\[[\s\S]*\]);/);

if (!match) {
  console.error("FAIL: Could not parse galleryManifest array from lib/gallery/manifest.ts");
  process.exit(1);
}

let entries;
try {
  entries = JSON.parse(match[1]);
} catch (err) {
  console.error("FAIL: Malformed JSON inside manifest:", err.message);
  process.exit(1);
}

let localCount = 0;
let remoteCount = 0;
let driveCount = 0;
let customCount = 0;

const categoryCounts = {};
const seenIds = new Set();
const duplicateIds = [];
const seenSources = new Set();
const duplicateSources = [];
const seenDriveIds = new Set();
const duplicateDriveIds = [];
const missingSrcEntries = [];
const malformedEntries = [];

for (const [index, entry] of entries.entries()) {
  const recordDesc = entry.id ? `Item '${entry.id}'` : `Item at index ${index}`;

  // 1. Validate required fields
  if (!entry.id || typeof entry.id !== "string") {
    malformedEntries.push(`${recordDesc}: missing or invalid 'id'`);
  }
  if (!entry.title || typeof entry.title !== "string") {
    malformedEntries.push(`${recordDesc}: missing or invalid 'title'`);
  }
  if (!entry.categorySlug || typeof entry.categorySlug !== "string") {
    malformedEntries.push(`${recordDesc}: missing or invalid 'categorySlug'`);
  }
  if (typeof entry.w !== "number" || typeof entry.h !== "number") {
    malformedEntries.push(`${recordDesc}: missing or non-numeric dimensions 'w'/'h'`);
  }
  if (!entry.storage) {
    malformedEntries.push(`${recordDesc}: missing 'storage' definition`);
    missingSrcEntries.push(recordDesc);
    continue;
  }

  // 2. Check for duplicate IDs
  if (entry.id) {
    if (seenIds.has(entry.id)) {
      duplicateIds.push(entry.id);
    } else {
      seenIds.add(entry.id);
    }
  }

  // 3. Resolve source string & provider
  let resolvedSource = "";
  let isLocal = false;
  let isDrive = false;
  let driveId = null;

  if (typeof entry.storage === "string") {
    resolvedSource = entry.storage;
    isLocal = entry.storage.startsWith("/") || !entry.storage.startsWith("http");
  } else if (typeof entry.storage === "object") {
    const { provider } = entry.storage;
    if (provider === "local") {
      isLocal = true;
      resolvedSource = entry.storage.path || "";
    } else if (provider === "google-drive") {
      isDrive = true;
      driveId = entry.storage.fileId;
      resolvedSource =
        entry.storage.directUrl ||
        (driveId ? `https://drive.google.com/uc?export=view&id=${driveId}` : "");
    } else if (provider === "custom") {
      resolvedSource = entry.storage.url || "";
    } else {
      malformedEntries.push(`${recordDesc}: unknown storage provider '${provider}'`);
    }
  } else {
    malformedEntries.push(`${recordDesc}: invalid storage field type`);
  }

  if (!resolvedSource) {
    missingSrcEntries.push(recordDesc);
  }

  // 4. Check duplicate sources
  if (resolvedSource) {
    if (seenSources.has(resolvedSource)) {
      duplicateSources.push({ id: entry.id, source: resolvedSource });
    } else {
      seenSources.add(resolvedSource);
    }
  }

  // 5. Check duplicate Drive IDs
  if (isDrive && driveId) {
    driveCount++;
    if (seenDriveIds.has(driveId)) {
      duplicateDriveIds.push(driveId);
    } else {
      seenDriveIds.add(driveId);
    }
  }

  // 6. Tally local vs remote
  if (isLocal) {
    localCount++;
  } else {
    remoteCount++;
    if (!isDrive) customCount++;
  }

  // 7. Tally categories
  const cat = entry.category || entry.categorySlug || "Uncategorized";
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
}

// Print Audit Results
console.log(`Total gallery entries: ${entries.length}`);
console.log(`  Local entries:       ${localCount}`);
console.log(`  Remote entries:      ${remoteCount} (Google Drive: ${driveCount}, Custom/CDN: ${customCount})`);

console.log("\nCount by Category:");
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`  - ${cat}: ${count}`);
}

console.log("\nIntegrity Checks:");
console.log(`  Missing source values:     ${missingSrcEntries.length === 0 ? "NONE (PASS)" : missingSrcEntries.length}`);
console.log(`  Duplicate IDs:             ${duplicateIds.length === 0 ? "NONE (PASS)" : duplicateIds.join(", ")}`);
console.log(`  Duplicate source URLs:     ${duplicateSources.length === 0 ? "NONE (PASS)" : duplicateSources.map((s) => s.source).join(", ")}`);
console.log(`  Duplicate Drive IDs:       ${duplicateDriveIds.length === 0 ? "NONE (PASS)" : duplicateDriveIds.join(", ")}`);
console.log(`  Malformed manifest records: ${malformedEntries.length === 0 ? "NONE (PASS)" : malformedEntries.length}`);

if (missingSrcEntries.length > 0) {
  console.error("\nErrors - Missing Sources:", missingSrcEntries);
}
if (duplicateIds.length > 0) {
  console.error("\nErrors - Duplicate IDs:", duplicateIds);
}
if (duplicateDriveIds.length > 0) {
  console.error("\nErrors - Duplicate Drive IDs:", duplicateDriveIds);
}
if (malformedEntries.length > 0) {
  console.error("\nErrors - Malformed Entries:", malformedEntries);
}

const hasErrors =
  missingSrcEntries.length > 0 ||
  duplicateIds.length > 0 ||
  malformedEntries.length > 0;

if (hasErrors) {
  console.error("\nFAIL: Gallery audit found manifest issues.");
  process.exit(1);
}

console.log("\n=== Gallery Storage & Migration Audit Complete: ALL CHECKS PASSED ===");
