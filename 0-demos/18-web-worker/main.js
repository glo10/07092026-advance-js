// main.js
// 1. Instanciation du Web Worker
const monWebWorker = new Worker('worker.js');
// 2. Envoi d'une commande ou de données au worker
monWebWorker.postMessage({ action: 'compute', valeur: 999999999 });
// 3. Écoute de la réponse du worker
monWebWorker.onmessage = function(event) {
console.log('Résultat reçu du Web Worker :', event.data);
};