// Lightweight client-side image cache for Jeizi Portfolio
// Caches remote Google Drive image assets only; does not intercept site bundles or navigation.

const CACHE_NAME = "jeizi-gallery-v1";

const ALLOWED_HOSTS = [
  "lh3.googleusercontent.com",
  "drive.google.com",
  "drive.usercontent.google.com",
];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith("jeizi-gallery-") && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests to allowed image hosts
  if (event.request.method !== "GET" || !ALLOWED_HOSTS.includes(url.hostname)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(event.request, { mode: "cors" });
        // Cache valid responses (status 200 or opaque cross-origin responses)
        if (response && (response.status === 200 || response.type === "opaque")) {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        // Fallback to fetch without mode in case of opaque request
        return fetch(event.request);
      }
    })
  );
});
