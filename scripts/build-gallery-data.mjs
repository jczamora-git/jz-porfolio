/**
 * Scans public/gallery/<category>/*.png and synchronizes lib/gallery/manifest.ts
 * while preserving any remote storage entries (Google Drive, CDN, etc.).
 *
 * Re-run with:  npm run gallery:build
 */
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const galleryDir = join(root, "public", "gallery");
const manifestFile = join(root, "lib", "gallery", "manifest.ts");

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const CATEGORY_LABELS = {
  featured: "Featured",
  event: "Event & Competition",
  logo: "Logo Design",
  print: "Print & Collateral",
  social: "Social Media",
  shirts: "T-Shirt & Apparel",
};

function pngSize(file) {
  const buf = readFileSync(file);
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function humanize(slug) {
  let t = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  t = t.replace(/\b(Prev|Preview|Test|V[0-9]|@2x|2x|Copy)\b/g, " ");
  return t.replace(/\s+/g, " ").trim() || "Untitled";
}

// 1. Load existing manifest if present to preserve remote entries or custom metadata
let existingEntries = [];
if (existsSync(manifestFile)) {
  const content = readFileSync(manifestFile, "utf-8");
  const match = content.match(/export const galleryManifest:\s*GalleryManifestEntry\[\]\s*=\s*(\[[\s\S]*\]);/);
  if (match) {
    try {
      existingEntries = JSON.parse(match[1]);
    } catch {
      console.warn("Could not parse existing manifest JSON; re-indexing local files.");
    }
  }
}

const existingMap = new Map();
for (const entry of existingEntries) {
  existingMap.set(entry.id, entry);
}

const categories = Object.keys(CATEGORY_LABELS);
const newEntries = [];

// 2. Scan local public/gallery
for (const cat of categories) {
  const dir = join(galleryDir, cat);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).sort(naturalCompare)) {
    if (!file.toLowerCase().endsWith(".png")) continue;
    const src = join(dir, file);
    const slug = file.replace(/\.png$/i, "");
    const id = `${cat}-${slug}`;
    const { w, h } = pngSize(src);

    if (existingMap.has(id)) {
      // Keep existing entry (may have custom metadata or remote storage config)
      const existing = existingMap.get(id);
      newEntries.push(existing);
      existingMap.delete(id);
    } else {
      newEntries.push({
        id,
        title: humanize(slug),
        categorySlug: cat,
        category: CATEGORY_LABELS[cat],
        alt: `${humanize(slug)} — ${CATEGORY_LABELS[cat]}`,
        w,
        h,
        storage: {
          provider: "local",
          path: `/gallery/${cat}/${file}`,
        },
      });
    }
  }
}

// 3. Keep remaining existing entries that might be remote storage (where local file no longer exists)
for (const entry of existingMap.values()) {
  const isRemote =
    typeof entry.storage === "string"
      ? entry.storage.startsWith("http")
      : entry.storage.provider !== "local";

  if (isRemote) {
    newEntries.push(entry);
  }
}

const output = `// Canonical gallery manifest.
// Entries specify storage source (local path, Google Drive fileId, or custom CDN URL).
import type { GalleryManifestEntry } from "./storage";

export const galleryManifest: GalleryManifestEntry[] = ${JSON.stringify(newEntries, null, 2)};
`;

mkdirSync(dirname(manifestFile), { recursive: true });
writeFileSync(manifestFile, output);
console.log(`Wrote ${manifestFile} with ${newEntries.length} items.`);
