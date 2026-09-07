/**
 * L'IIFE (Immediately Invoked Function Expression) : En JavaScript pré-ES6, 
 * seules les fonctions créaient un nouveau scope. En enveloppant le code dans une fonction exécutée immédiatement (function() { ... })(), on crée une "bulle" isolée.
Closure : La variable count reste en mémoire parce que les fonctions increment et getCount y font référence.
L'objet CounterApp exposé a accès à count, mais personne d'autre ne peut modifier directement la variable count sans passer par ces méthodes.
 */
// IIFE avec injection explicite de window
(function(global) {
  // Variable privée : inaccessible depuis l'extérieur
  var count = 0;

  function increment() {
    count++;
  }

  function getCount() {
    return count;
  }

  // Exposition contrôlée de l'API publique
  global.CounterApp = {
    increment: increment,
    getCount: getCount
  };

})(window);

// Test d'utilisation :
console.log(window.count); // undefined (la variable est protégée dans la closure)
CounterApp.increment();
CounterApp.increment();
console.log(CounterApp.getCount()); // 2