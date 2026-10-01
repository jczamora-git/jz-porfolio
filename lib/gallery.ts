// Gallery data layer.
// Resolves canonical gallery manifest entries into normalized GalleryAsset models.

import { galleryManifest } from "./gallery/manifest";
import {
  resolveManifestEntry,
  CATEGORY_LABELS,
  type GalleryAsset,
  type GalleryItem,
  type GalleryManifestEntry,
  type GalleryStorageSource,
  type StorageProvider,
} from "./gallery/storage";

export {
  type GalleryAsset,
  type GalleryItem,
  type GalleryManifestEntry,
  type GalleryStorageSource,
  type StorageProvider,
  resolveManifestEntry,
  galleryManifest,
};

export const galleryCategories: { slug: string; label: string }[] = Object.entries(
  CATEGORY_LABELS
).map(([slug, label]) => ({ slug, label }));

/**
 * Normalized gallery assets consumed by React components.
 * Storage-provider-independent: all sources are normalized into clean `src` URLs.
 */
export const galleryItems: GalleryAsset[] = galleryManifest.map((entry) =>
  resolveManifestEntry(entry)
);
