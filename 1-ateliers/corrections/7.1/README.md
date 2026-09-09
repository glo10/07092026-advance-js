
# Correction atelier 7.1 : Web APIs et PWA

- **Asynchronisme des API Matérielles :** `getCurrentPosition` repose sur une fonction à callback d'époque. L'encapsuler dans une `Promise` moderne permet de l'intégrer proprement dans un flux de code `async/await`.
- **Sécurité & HTTPS :** La majorité des navigateurs bloquent l'accès à l'API de Géolocalisation si la page n'est pas servie au travers d'un protocole sécurisé (`HTTPS`) ou depuis `localhost`.

- **Un thread séparé :** Le Service Worker ne s'exécute **pas** dans le thread principal du navigateur. Il n'a aucun accès direct au DOM, à `window` ou au `localStorage`. Il agit comme un **proxy réseau programmable** placé entre l'application web et Internet.
- **`event.waitUntil()` :** Indique au navigateur de ne pas interrompre le Service Worker pendant la phase d'installation avant que la Promesse de mise en cache (`cache.addAll`) ne soit totalement résolue.nd-to-end