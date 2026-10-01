/**
 * Storage-provider-independent adapters and normalization helpers for gallery assets.
 * All provider-specific details (e.g. Google Drive, Cloudflare R2, S3) are isolated here.
 */

export type StorageProvider = "local" | "google-drive" | "custom";

export type LocalStorageSource = {
  provider: "local";
  path: string;
};

export type GoogleDriveStorageSource = {
  provider: "google-drive";
  fileId: string;
  directUrl?: string;
};

export type CustomStorageSource = {
  provider: "custom";
  url: string;
};

export type GalleryStorageSource =
  | LocalStorageSource
  | GoogleDriveStorageSource
  | CustomStorageSource;

export type GalleryCategorySlug =
  | "featured"
  | "event"
  | "logo"
  | "print"
  | "social"
  | "shirts";

export const CATEGORY_LABELS: Record<string, string> = {
  featured: "Featured",
  event: "Event & Competition",
  logo: "Logo Design",
  print: "Print & Collateral",
  social: "Social Media",
  shirts: "T-Shirt & Apparel",
};

/**
 * Manifest record defining an asset in storage.
 */
export type GalleryManifestEntry = {
  id: string;
  title: string;
  categorySlug: string;
  category?: string;
  filename?: string;
  alt?: string;
  w: number;
  h: number;
  storage: GalleryStorageSource | string;
};

/**
 * Canonical Gallery Asset model consumed by React components.
 * Independent of storage provider details.
 */
export type GalleryAsset = {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  width?: number;
  height?: number;
};

// Backwards-compatibility alias for GalleryAsset
export type GalleryItem = GalleryAsset;

/**
 * Resolves Google Drive file ID into a public direct view URL.
 * Isolated here so components never know Google Drive URL formats.
 */
export function resolveGoogleDriveUrl(fileId: string, directUrl?: string): string {
  if (directUrl) return directUrl;
  // Direct Google CDN endpoint for public Drive image files
  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}`;
}

/**
 * Normalizes any storage source definition into a public URL or path string.
 */
export function resolveAssetSource(source: GalleryStorageSource | string): string {
  if (typeof source === "string") {
    // If it's a full remote URL or already an absolute local path
    return source;
  }

  switch (source.provider) {
    case "local":
      return source.path.startsWith("/") ? source.path : `/${source.path}`;
    case "google-drive":
      return resolveGoogleDriveUrl(source.fileId, source.directUrl);
    case "custom":
      return source.url;
    default:
      throw new Error(`Unsupported storage provider: ${(source as { provider?: string })?.provider}`);
  }
}

/**
 * Resolves a manifest entry into a canonical GalleryAsset.
 */
export function resolveManifestEntry(
  entry: GalleryManifestEntry,
  categoryLabels: Record<string, string> = CATEGORY_LABELS
): GalleryAsset {
  const src = resolveAssetSource(entry.storage);
  const category = entry.category || categoryLabels[entry.categorySlug] || entry.categorySlug;
  const alt = entry.alt || `${entry.title} — ${category}`;

  return {
    id: entry.id,
    title: entry.title,
    category,
    categorySlug: entry.categorySlug,
    src,
    alt,
    w: entry.w,
    h: entry.h,
    width: entry.w,
    height: entry.h,
  };
}
