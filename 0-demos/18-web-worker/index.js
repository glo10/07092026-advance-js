/**
 * Bloquant, lorsque ce traitement est lancé on ne peut plus réagir avec l'interface
 * Tout sera figé
 * Pour régler ce problème, utilisation du web worker worker.js
 */
let resultat = 0
for (let i = 0; i < 999999999; i++) {
    resultat += i;
}
console.log('resultat', resultat)