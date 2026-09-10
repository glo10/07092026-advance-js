
# Correction atelier 7.1 : Web APIs et PWA

## Explications

- **Asynchronisme des API Matérielles :** `getCurrentPosition` repose sur une fonction à callback d'époque. L'encapsuler dans une `Promise` moderne permet de l'intégrer proprement dans un flux de code `async/await`.
- **Sécurité & HTTPS :** La majorité des navigateurs bloquent l'accès à l'API de Géolocalisation si la page n'est pas servie au travers d'un protocole sécurisé (`HTTPS`) ou depuis `localhost`.

- **Un thread séparé :** Le Service Worker ne s'exécute **pas** dans le thread principal du navigateur. Il n'a aucun accès direct au DOM, à `window` ou au `localStorage`. Il agit comme un **proxy réseau programmable** placé entre l'application web et Internet.
- **`event.waitUntil()` :** Indique au navigateur de ne pas interrompre le Service Worker pendant la phase d'installation avant que la Promesse de mise en cache (`cache.addAll`) ne soit totalement résolue.nd-to-end

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/7.1/

#### `1-ateliers/corrections/7.1/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>atelier-7.1</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <h1>Web API</h1>
    <div id="app"></div>
    <script type="module" src="src/main.js"></script>
  </body>
</html>
```

#### `1-ateliers/corrections/7.1/package.json`

```json
{
  "name": "atelier-7.1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  }
}

```

#### `1-ateliers/corrections/7.1/public/style.css`

```css
body {
    background-color: lightblue;
}
```

#### `1-ateliers/corrections/7.1/src/api.ts`

```typescript
import type { GitHubUser } from "../types";

export async function findUsers(
  url: string = "https://api.github.com/users",
): Promise<GitHubUser[]> {
  const cacheName = "app-cache-user-v1";

  // 1. Ouverture de l'espace de cache
  const cache = await caches.open(cacheName);

  // 2. Recherche d'une réponse déjà mise en cache (Cache First)
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    console.log("Donnée récupérée depuis le Cache");
    return (await cachedResponse.json()) as GitHubUser[];
  }

  // 3. Si absente du cache, appel réseau (Network Fallback)
  console.log("Récupération en cours...");
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }
  
  // 4. Inscription dans le cache pour les prochains appels
  cache.put(url, res.clone());

  // 5. Retour de la donnée sous forme d'objet JSON
  return (await res.json()) as GitHubUser[];
}
```

#### `1-ateliers/corrections/7.1/src/gps.ts`

```typescript
import type { Coordinates } from "../types";

export async function getUserCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(
        new Error(
          "La géolocalisation n'est pas supportée par votre navigateur.",
        ),
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "L'utilisateur a refusé la demande de géolocalisation.",
              ),
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(
              new Error("Les informations de localisation sont indisponibles."),
            );
            break;
          case error.TIMEOUT:
            reject(new Error("La demande de localisation a expiré."));
            break;
          default:
            reject(new Error("Une erreur inconnue est survenue."));
        }
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  });
}

export function computeDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function displayDistance(): Promise<string> {
  try {
    const userCoords: Coordinates = await getUserCoordinates();
    const parisCoords: Coordinates = { latitude: 48.8566, longitude: 2.3522 };

    const distance = computeDistance(
      userCoords.latitude,
      userCoords.longitude,
      parisCoords.latitude,
      parisCoords.longitude,
    );

    return `Vous êtes à environ ${distance} km.`
  } catch (err) {
    if (err instanceof Error) {
      return `Erreur Géolocalisation : ${err.message}`
    } else {
      return `Erreur Géolocalisation : ${err}`
    }
  }
}

```

#### `1-ateliers/corrections/7.1/src/main.ts`

```typescript
import { displayDistance, getUserCoordinates } from "./gps"
import { findUsers } from "./api"

// sans web worker
Promise.all([findUsers(), getUserCoordinates(), displayDistance()])
.then(([users, coords, distance]) => {
    console.log('users', users)
    console.log('coords', coords)
    console.log('distance', distance)
} )

/**
 * Avec web worker
 */
const apiWebWorker = new Worker('./workers/api-web-worker.js')
apiWebWorker.onmessage = (event) => {
    const  { status, data, message } = event.data
    if(status === 'success') {
        console.log('users depuis le worker', data)
    } else  {
        console.error('erreur fetch users', message)
    }
}

apiWebWorker.onerror = (error) => {
    console.error('Erreur worker', error)
}

apiWebWorker.postMessage('FETCH_USERS')

// Les assets depuis service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./workers/cache-service-worker.js')
    .then(registration => {
      console.log('Service Worker enregistré avec succès, scope:', registration.scope);
    })
    .catch(error => {
      console.error("Échec de l'enregistrement du Service Worker :", error);
    });
}



              

```

#### `1-ateliers/corrections/7.1/src/workers/api-web-worker.ts`

```typescript
import { findUsers } from "../api"

self.onmessage = async (event) => {
    if(event.data === 'FETCH_USERS') {
        try {
            const users = await findUsers()
            self.postMessage({ status: 'success', data : users})
        } catch(error) {
            self.postMessage({ status: 'error', message: error })
        }
    }
}
```

#### `1-ateliers/corrections/7.1/src/workers/cache-service-worker.ts`

```typescript
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

```

#### `1-ateliers/corrections/7.1/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es2023",
    "module": "esnext",
    "lib": ["ES2023", "DOM.Iterable", "WebWorker"],
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

#### `1-ateliers/corrections/7.1/types/index.ts`

```typescript
export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  [key: string]: unknown; // tous les autres clés
}

```

<!-- END AUTO-GENERATED -->