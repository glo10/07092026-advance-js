
import { createServer } from "node:http"; // pour créer un serveur
import { createReadStream } from "node:fs"; // chargement fichier par petit paquet (flux)
import { resolve } from "node:path"; // pour la résolution de chemin => obtenir un chemin absolu
import { fileURLToPath } from "node:url"; // transformer l'url en chemin

const PORT = 8000; // port d'écoute du serveur
// __dirname dossier dans lequel se trouve le programme exécuté
const __dirname = fileURLToPath(new URL(".", import.meta.url)); // par convention __dirname car dirname existe déja dans le package node:url

createServer((req, res) => {
  let filename = req.url === "/"
    ? "index.html"
    : "404.html";
  filename = resolve(__dirname, filename) // chémin absolue de la page HTML
  res.statusCode = req.url === "/" ? 200 : 404; // statut HTTP renvoyé au client
  res.setHeader("Content-Type", "text/html; charset=utf-8"); // en-têtes renvoyés au client

  // Réponse au client avec le flux de lecture de la page HTML synchronisé avec l'objet res
  createReadStream(filename).pipe(res);
}).listen(PORT, () => { // lancer le serveur en écoute sur le port défini
  console.info(`Server listening on http://localhost:${PORT}`);
});
              