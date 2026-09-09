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