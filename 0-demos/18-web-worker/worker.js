
// Écoute les messages provenant du script principal
self.onmessage = function(event) {
  if (event.data.action === 'compute') {
    let resultat = 0;
    // Simulation d'une tâche lourde
    for (let i = 0; i < event.data.valeur; i++) {
      resultat += i;
    }
    // Renvoi du résultat au script principal
    self.postMessage(resultat);
  }
};
              