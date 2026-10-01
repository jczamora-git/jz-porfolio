# Deployment Architecture & Incident Resolution

## Incident Overview

The Anybuild deployment previously exceeded its builder memory budget during the Node server packaging phase (`.next-bundle/server.mjs`).

Analysis of the codebase confirmed that the portfolio requires no request-time Node server features:
- No dynamic server routes (`dynamicParams` / `getServerSideProps`)
- No Next.js API routes (`app/api/`)
- No Server Actions or dynamic header/cookie evaluations
- Interactive client components (gallery filtering, lightbox modal, contact form) operate entirely in the client browser.

## Architectural Decision: Static Export

The project has transitioned from a Node server deployment to a native Next.js Static Export, producing an `out/` artifact that Anybuild's static Next.js provider can serve directly without running a Node server runtime.

### Next.js Documentation References Consulted
- `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` (Static exports guide)
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (Image unoptimized configuration)

### Configuration Changes (`next.config.ts`)
1. **`output: "export"`**: Directs Next.js to generate purely static HTML/CSS/JS and copy public assets into `out/`.
2. **`trailingSlash: true`**: Emits `/gallery/index.html` instead of `/gallery.html`, enabling clean deterministic directory routing on generic static web servers without custom rewrite rules.
3. **`images: { unoptimized: true }`**: Disables the runtime `/_next/image` image optimization server endpoint, serving image assets directly from their static paths.
4. **Turbopack root preserved**: Retains `turbopack: { root: process.cwd() }`.

## Build Context Protection (`.dockerignore`)

A `.dockerignore` file prevents non-essential files from bloating the Docker build context transferred to the remote builder:
- Excludes: `.git`, `node_modules`, `.next`, `out`, `build`, `dist`, `*.log`, `*.pid`, `.freebuff`, `.vscode`, `.idea`, OS temporary files.
- Preserves: `public/`, `app/`, `components/`, `lib/`, `scripts/`, package manifests, and configuration files.

## Deployment Verification Harness

The following npm scripts provide verification across the build pipeline:

- `npm run deploy:audit`: Audits static export settings in `next.config.ts`, verifies `.dockerignore`, checks public asset distribution, and confirms absence of server-only API routes.
- `npm run verify`: Runs ESLint and TypeScript checks (`next lint && tsc --noEmit`).
- `npm run build`: Executes Next.js static build (`next build`), outputting to `out/`.
- `npm run verify:static`: Validates that `out/` contains all expected routes (`index.html`, `gallery/index.html`, `404.html`), checks that HTML references avoid `/_next/image`, and verifies representative image assets.

## Asset Budget Assessment & Future Recommendations

The current `public/` directory is ~295.86 MB, of which `public/gallery/` accounts for ~288.58 MB (97.5%).
Many gallery PNG mockups are 8MB–17MB each.

While Next.js static export succeeds without running the heavy Node image optimization server, transferring and uploading ~300 MB of assets can still stress memory and bandwidth limits on resource-constrained deployment environments.

### Recommended Future Phase: Pre-build Asset Optimization
- Run an offline/local optimization script to produce web-ready derivatives (WebP or compressed PNG) with acceptable quality.
- Update `lib/gallery.ts` / `scripts/build-gallery-data.mjs` to reference optimized assets.
- Preserve original high-resolution design masters in an offline archive or separate asset repository rather than in the primary git build tree.
- Do NOT run heavy image processing (e.g. sharp) during the constrained CI/CD builder run.

## Gallery Remote Storage Architecture & Migration

The gallery architecture has been decoupled from local files to support incremental migration to remote storage (Google Drive, Cloudflare R2, AWS S3, or CDN) without altering React components or site aesthetics.

### Key Architecture Principles
1. **Storage Independence**: React components (`GalleryGrid.tsx`, `app/gallery/page.tsx`) consume only normalized `GalleryAsset` objects (`src`, `title`, `category`, `alt`, `w`, `h`). They contain zero provider-specific logic.
2. **Centralized Provider Adapter**: All provider translation (e.g. Google Drive file IDs -> public view URLs) is isolated in `lib/gallery/storage.ts`.
3. **Canonical Manifest**: `lib/gallery/manifest.ts` stores each asset with its storage definition. Each entry can individually point to `local`, `google-drive`, or `custom` remote storage.
4. **Zero Credentials/OAuth**: The system operates entirely on public read-only image assets. No API secrets, OAuth tokens, or server routes are involved.
5. **Static Export Preserved**: The Next.js image configuration uses `images.unoptimized: true` with strict `remotePatterns` for `drive.google.com` and `lh3.googleusercontent.com`.

### Safe Incremental Migration Workflow

Follow this 10-step procedure when migrating artwork to remote storage:

1. **Upload image to remote storage**: Upload the image asset to the designated remote storage folder (e.g. Google Drive).
2. **Make the image publicly viewable/read-only**: Set file permissions to "Anyone with the link can view". Do not require authentication.
3. **Obtain and verify its remote identifier/URL**: Copy the file ID (or direct URL) and verify that the image opens directly in an incognito browser window.
4. **Add/update the manifest entry**: In `lib/gallery/manifest.ts`, update the target item's `storage`:
   ```ts
   {
     "id": "featured-certificate",
     "title": "Certificate",
     "categorySlug": "featured",
     "category": "Featured",
     "alt": "Certificate — Featured",
     "w": 3508,
     "h": 2480,
     "storage": {
       "provider": "google-drive",
       "fileId": "<VERIFIED_DRIVE_FILE_ID>"
     }
   }
   ```
5. **Run audit**: Run `npm run gallery:audit` to verify ID uniqueness, URL format integrity, and track migration count.
6. **Run the site locally**: Run `npm run dev` and navigate to `/gallery`.
7. **Visually verify thumbnail**: Ensure the masonry thumbnail renders with the correct aspect ratio and crisp appearance.
8. **Visually verify lightbox/full view**: Click the work to confirm the full modal opens, navigation functions, and the image scales cleanly.
9. **Verify mobile behavior**: Inspect responsive behavior on mobile/tablet viewports.
10. **Remove the corresponding local file ONLY after migration**: Once the remote asset is verified and committed, the corresponding file in `public/gallery/` can be safely removed.

> [!WARNING]
> **DO NOT bulk-delete `public/gallery`** until `npm run gallery:audit` confirms that `Local entries: 0` and zero manifest entries depend on local gallery files. Bulk-deleting before full migration will break all unmigrated items.

