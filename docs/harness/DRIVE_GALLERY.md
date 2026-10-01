# Drive Gallery Source of Truth

STATUS: ACTIVE
TOTAL_WORKS: 79

## Purpose

This document is the durable source of truth for the Jeizi Portfolio remote gallery storage structure. Future agents must read this file before doing gallery-storage work.

Do not rediscover this information from rendered HTML, screenshots, or folder names unless this document is explicitly marked stale.

---

## Main Google Drive

- **Main Drive folder ID**: `1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi`
- **Original shared folder URL**: [https://drive.google.com/drive/folders/1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi?usp=drive_link](https://drive.google.com/drive/folders/1NP099TUQaYz7xs_wZ6QutJrZI5wl9kvi?usp=drive_link)

This root folder contains the portfolio media category folders.

---

## Category Map

| Category key | UI label | Drive folder ID | Expected works |
| :--- | :--- | :--- | :--- |
| `featured` | Featured | `1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n` | 6 |
| `event` | Event & Competition | `1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5` | 10 |
| `logo` | Logo Design | `1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc` | 13 |
| `print` | Print & Collateral | `1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW` | 9 |
| `social` | Social Media | `1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm` | 20 |
| `shirts` | T-Shirt & Apparel | `1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r` | 21 |
| **TOTAL** | | | **79** |

---

## Original Category Folder Links

- **Social Media**: [https://drive.google.com/drive/u/0/folders/1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm](https://drive.google.com/drive/u/0/folders/1mkO97F5i1JNoTQcLD5R4UFIEN-a-pZPm)
- **Print & Collateral**: [https://drive.google.com/drive/u/0/folders/1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW](https://drive.google.com/drive/u/0/folders/1yr7jqSf7MvoN2of8QwFngwdAkwySBVzW)
- **T-Shirt & Apparel**: [https://drive.google.com/drive/u/0/folders/1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r](https://drive.google.com/drive/u/0/folders/1iPkgip2CDJkiq6tfp0D_iTu3GptvBg1r)
- **Logo Design**: [https://drive.google.com/drive/u/0/folders/1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc](https://drive.google.com/drive/u/0/folders/1pICY8qRqJvIY1MrSVpQLmSBGwEoJstkc)
- **Featured**: [https://drive.google.com/drive/u/0/folders/1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n](https://drive.google.com/drive/u/0/folders/1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n)
- **Event & Competition**: [https://drive.google.com/drive/u/0/folders/1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5](https://drive.google.com/drive/u/0/folders/1RDSIMmbxpi_EbJV6kH9GDPHWtMdBFT-5)

---

## 79-Work Collection Contract

This collection must remain exactly 79 works unless the project owner explicitly changes the gallery:

- `featured` = 6
- `event` = 10
- `logo` = 13
- `print` = 9
- `social` = 20
- `shirts` = 21
- **TOTAL** = 79

Any gallery audit must fail if these category counts drift unexpectedly.

---

## Expected Titles

These are DISPLAY TITLES. They are not unique identifiers. Duplicate display titles are valid.

### Featured (6 works)
- Certificate
- Cmo Banner
- Cmo Logo
- Cmo Profile
- Display
- Start

### Event & Competition (10 works)
- Battle Results
- Bracket
- Display
- Instant Replay
- Loading Screen *(Duplicate title #1)*
- Loading Screen *(Duplicate title #2)*
- Match Overlay *(Duplicate title #1)*
- Match Overlay *(Duplicate title #2)*
- Match Sched
- Roster

> [!IMPORTANT]
> Intentional duplicate display titles exist (`Loading Screen`, `Match Overlay`). Display title must NEVER be used as the sole unique identifier.

### Logo Design (13 works)
- Dce Logo
- Emerald Hamony Text *(Preserve exact spelling: "Emerald Hamony Text")*
- Emerald Harmony Logo
- Jeizi Production
- Linguists Society 1
- Lnk Kalap Cup Logo Textured
- Lnk Naujan
- Mibt Logo 1
- Mlbb Balite Tournament 2025
- Myfi Converge Invitational Logo
- Palhi Tournament Logo
- Sali Talon
- Ultra Esports Text 1

### Print & Collateral (9 works)
- Board Champion
- Certificate Jeizi
- Certificate Lnk
- Certificate Template
- I Book Cover
- Iii Iv About Ver 4
- Lpt Na Babbyy Kooo
- Plake
- Tarp Design

### Social Media (20 works)
- 1 Day
- 5
- 6
- 7
- 11
- 12
- 15
- 16
- 17
- 18
- Cover Photo
- Profile Pic 2
- Pubmat
- Pubmatlnk
- Sk Interbarangay Mlb
- Standings
- Story 1
- Story 2
- Teams
- Tournament Champ

### T-Shirt & Apparel (21 works)
- 1
- 2
- 3
- 4
- 5 1
- 5 2
- 6
- 6d Away
- 6d Home
- 7
- 8
- 9
- 10
- Apex Landscaping
- Black Legits
- Legits Club Shirt
- Lnk Mockup
- Sample
- Sk Fed Mockup
- Usg Mcc
- Whitelegits

---

## Important Identity Rules

- **Display title is NOT a stable identifier**: Display titles may repeat across and within categories.
- **Unique App IDs**: Every entry must have a stable unique ID in `lib/gallery/manifest.ts` (e.g. `event-loading-screen-prev`, `event-loading-screen`).
- **Do not rename existing stable IDs** without an architectural reason.
- **Drive file IDs must be unique** unless an intentional shared image is explicitly documented.

---

## Drive Folder ID vs Drive File ID

> [!WARNING]
> Known folder IDs are NOT image file IDs.
> For example: `1VjkTQ1zrOngNlHngLaTpkVXBWR7ooj7n` identifies the FEATURED folder; it does NOT identify `certificate.png` or any individual work.

1. Every displayed image needs either an individual verified Google Drive file ID or an individually verified direct image URL.
2. Never derive file IDs from filenames or titles.
3. Never use a folder ID as an `<img src>`.
4. Never mark Drive migration as complete merely because the 6 category folder IDs exist.

---

## Current Drive Mapping State

- Folder hierarchy: **KNOWN & LOCKED** (Main + 6 Category folders)
- 79-work collection structure: **KNOWN & LOCKED**
- Drive enumeration workflow: **AUTOMATED & IMPLEMENTED**
- Drive file IDs are obtained automatically using the bulk enumerator (`scripts/google-drive-enumerator.gs` + `scripts/import-drive-manifest.mjs`), NEVER collected manually.
- Canonical ID map: `lib/gallery/drive-files.ts`
- Authoritative manifest: `lib/gallery/manifest.ts`

---

## Google Drive Bulk Mapping Workflow

To populate or refresh Drive file IDs in bulk without opening individual files:

1. Open [script.google.com](https://script.google.com) while signed in to the Google account that owns the folders.
2. Create a temporary Apps Script project.
3. Paste `scripts/google-drive-enumerator.gs`.
4. Run `exportJeiziGalleryManifest()`.
5. Authorize read access to Drive when prompted.
6. Copy the generated JSON block from the execution log.
7. Save it locally as `drive-files.json`.
8. Run:
   ```bash
   node scripts/import-drive-manifest.mjs drive-files.json
   ```
9. Run gallery audit:
   ```bash
   npm run gallery:audit
   ```
10. Build:
    ```bash
    npm run build
    ```
11. Verify static output:
    ```bash
    npm run verify:static
    ```

The user only has to run this workflow ONCE. Manual per-file collection is strictly prohibited.

## Storage Architecture Contract

Google Drive-specific behavior must remain isolated in `lib/gallery/storage.ts`. React components must never construct Google Drive URLs directly.

```
GalleryGrid / Modal Lightbox
  ↳ consumes normalized GalleryAsset.src
    ↳ resolved by lib/gallery/storage.ts
      ↳ provider: "google-drive" -> resolveGoogleDriveUrl(fileId)
```

Canonical data models:
- `GalleryManifestEntry`: `id`, `title`, `categorySlug`, `w`, `h`, `storage: { provider, fileId | path }`
- `GalleryAsset`: `id`, `title`, `category`, `categorySlug`, `src`, `alt`, `w`, `h`

---

## Static Export Contract

The gallery must remain compatible with Next.js 16 Static Export:
- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`
- No request-time Node server or database.
- No dynamic API routes for enumerating Drive at runtime.
- No Google OAuth client flow on the public portfolio.
- Use a pre-generated static manifest (`lib/gallery/manifest.ts`).

---

## Local Gallery Status

- Previous local `public/gallery/` assets: 79 files, 288.58 MB.
- Untracked from Git (`git rm -r --cached public/gallery`) and added to `.gitignore` and `.dockerignore`.
- Master original artwork is preserved on disk for development and local archive.
- Do NOT restore `public/gallery` to Git merely because a remote image URL fails. Fix the remote mapping instead.

---

## Image Performance Contract

- 79 works, 288.58 MB encoded source PNGs.
- Combined decoded RGBA memory: ~2.35 GB.
- Original image sizes reach 9508×4317, 9883×3863, 5674×5665, 4000×4000.
- CSS `width: 100%; height: auto` adjusts display layout only; it does NOT reduce download bytes or GPU decode bitmap memory.
- Long-term derivative target:
  - Thumbnail: ~800–1200px long edge.
  - Lightbox: ~1800–2400px long edge.
- Do not perform expensive image conversion during remote deployment build.

---

## Loading Contract

- Thumbnails: `loading="lazy"`, `decoding="async"`.
- Do not eagerly load all 79 original-resolution works.
- Lightbox image: requested only when the modal opens for that item.
- Optional prefetch: adjacent items (previous / next) only. Never prefetch the full gallery.

---

## Cache Contract

- Normal browser HTTP caching is preserved.
- If an image cache service worker is deployed:
  - Must be static-host compatible.
  - Cache gallery image requests only.
  - Versioned cache name (e.g. `jeizi-gallery-v1`).
  - Do not cache failed (non-200 / error) responses.
  - Clean old caches during `activate`.
  - Do not interfere with HTML/JS bundle deployments.
- **Open Issue**: Service worker registration in dev logs previously requested `/sw.js` resulting in 404. Service worker file is currently absent.

---

## Remote Image Verification Contract

An entry is only considered remotely migrated when its image URL successfully loads and displays in a browser `<img>` element.

Audits must report:
- `total`: 79
- `Drive`: count with verified file IDs
- `local`: count referencing local paths
- `unresolved`: count lacking verified remote source

Target final state: Total = 79, Drive = 79, Local = 0, Unresolved = 0.

---

## Deletion Gate

Local gallery assets remain removed/ignored from Git only when:
1. Gallery total = 79
2. Remote Drive mappings = 79
3. Unresolved = 0
4. Local dependencies = 0
5. Production build and static verification succeed.

---

## Harness Usage Rule

Future gallery/storage sessions must follow:

```
AGENTS.md
→ docs/harness/HANDOFF.md
→ docs/harness/DRIVE_GALLERY.md
→ npm run harness:status
→ READ NEXT exact files only
```
