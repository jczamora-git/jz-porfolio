// Lightweight client-side media cache for Jeizi Portfolio
// Versioned media cache for Google Drive assets & local portfolio media.
// Does NOT intercept Next.js chunks, SSR bundles, or HTML navigation.

const CACHE_NAME = "jeizi-media-v1";

const ALLOWED_REMOTE_HOSTS = [
  "lh3.googleusercontent.com",
  "drive.google.com",
  "drive.usercontent.google.com",
];

self.addEventListener("install", () => {
  // Do NOT precache all images — cache only on demand
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            // Delete old versions such as jeizi-gallery-v1 or previous jeizi-media-* caches
            if (key.startsWith("jeizi-") && key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only intercept GET requests
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Check if request is for remote Google Drive image assets
  const isRemoteMedia = ALLOWED_REMOTE_HOSTS.includes(url.hostname);

  // Check if request is for same-origin portfolio media
  const isSameOriginMedia =
    url.origin === self.location.origin &&
    (url.pathname.startsWith("/projects/") ||
      url.pathname.startsWith("/media/") ||
      url.pathname.startsWith("/gallery/") ||
      /\.(webp|png|jpg|jpeg|svg|ico)$/i.test(url.pathname));

  if (!isRemoteMedia && !isSameOriginMedia) {
    return;
  }

  // Cache First with network fallback
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }

      try {
        const networkResponse = await fetch(request, {
          mode: isRemoteMedia ? "cors" : "same-origin",
        });

        // Only cache valid 200 OK or opaque cross-origin responses
        if (
          networkResponse &&
          (networkResponse.status === 200 || networkResponse.type === "opaque")
        ) {
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch {
        // Fallback fetch without explicit mode for opaque request compatibility
        return fetch(request);
      }
    })
  );
});
