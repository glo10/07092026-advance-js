declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME: string = "app-assets-v1";

// Liste des ressources à mettre en cache
const ASSETS_TO_CACHE: string[] = [
  "/",
  "/index.html",
  "/style.css",
  "/src/main.js",
];

/**
 * Charge les ressources statiques dans le Cache Storage
 */
async function loadAssetsFromCache(): Promise<void> {
  const cache: Cache = await caches.open(CACHE_NAME);
  console.log("[Cache Asset Service Worker] Mise en cache des ressources statiques");
  await cache.addAll(ASSETS_TO_CACHE);
}

// 1. Événement 'install' : déclenché une seule fois à l'installation du service worker
self.addEventListener("install", (event: ExtendableEvent) => {
  // waitUntill garantit que le Cache Asset Service Worker ne s'installe pas tant que le cache n'est pas rempli
  event.waitUntil(loadAssetsFromCache());
});

// 2. Événement 'fetch' : intercepte TOUTES les requêtes réseau émises par la page
self.addEventListener("fetch", (event: FetchEvent) => {
  const requestUrl: URL = new URL(event.request.url);

  // Vérification : on n'intercepte que si le chemin fait partie de nos ressources cibles
  const isTargetAsset: boolean = ASSETS_TO_CACHE.includes(requestUrl.pathname);

  if (isTargetAsset) {
    event.respondWith(
      (async (): Promise<Response> => {
        // Recherche dans le cache
        const cachedResponse: Response | undefined = await caches.match(
          event.request,
        );
        if (cachedResponse) {
          console.log(`[Cache Asset Service Worker] Servie depuis le cache : ${requestUrl.pathname}`);
          return cachedResponse;
        }

        // Si absent du cache (ex: 1er chargement si addAll a échoué), on fait le fetch
        console.log(`[Cache Asset Service Worker] Récupération réseau : ${requestUrl.pathname}`);
        return fetch(event.request);
      })(),
    );
  }
});
