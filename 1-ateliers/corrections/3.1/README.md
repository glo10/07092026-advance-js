# Correction Atelier 3.1 : les architectures pré-ES2015

## app.js

Lorsqu'un script classique est placé dans le &lt;head> sans attribut d'asynchronisme, le navigateur interrompt le parsing du HTML pour télécharger et exécuter le script immédiatement. Au moment où app.js s'exécute, le navigateur n'a pas encore analysé la balise &lt;body> ni le &lt;button>. L'appel document.getElementById("title") renvoie donc null, ce qui provoque une erreur lors de la lecture de la propriété innerText.

## analytics.js


L'erreur dans app.js stoppe son exécution. Ensuite, le navigateur exécute analytics.js. Si titleText n'a pas été déclarée avec var plus haut (ou si son affectation a échoué), cela lève une ReferenceError: titleText is not defined.
Si app.js met 5 secondes à charger, le rendu de la page reste totalement bloqué pendant 5 secondes (écran blanc), car le parsing du DOM est suspendu par le script bloquant dans le &lt;head>.

## user.js

L'appel de renderHeader() affiche : "Utilisateur connecté : Alice (pending_payment)". La variable status déclarée dans checkout.js a écrasé la variable status de user.js car toutes deux ont été rattachées à l'objet global window.

## Conclusions

Cet exercice souligne 2 problèmes majeurs :

1. Absence d'isolation de code : Les variables globales partagent le même espace mémoire (window). Tout fichier peut modifier par inadvertance l'état interne d'un autre fichier.

2. Absence d'isolation sémantique : Il est impossible de savoir d'où provient une variable ou une fonction. Dans un gros projet avec 50 fichiers JS, déterminer quel script a déclaré status devient très complexe.

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/3.1

#### `1-ateliers/corrections/3.1/index.html`

```html
<!-- Solution A : Déplacement des scripts juste avant </body> -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Pre-ES6 Script Loading</title>
</head>
<body>
  <h1 id="title">Bienvenue sur le site</h1>

  <script src="app.js"></script>
  <script src="analytics.js"></script>
</body>
</html>
```

#### `1-ateliers/corrections/3.1/package.json`

```json
{
  "name": "3.1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "vitest": "^5.0.0"
  }
}

```

#### `1-ateliers/corrections/3.1/src/app.js`

```javascript
// Solution B : Attendre l'événement DOMContentLoaded dans app.js
document.addEventListener("DOMContentLoaded", function() {
  var titleText = document.getElementById("title").innerText;
  console.log("App initialisée avec succès :", titleText);
});
```

#### `1-ateliers/corrections/3.1/src/checkout.js`

```javascript
/**
 * Le Namespace Pattern limite la pollution en ne créant qu'une seule variable globale par grand domaine applicatif (ex: UserModule).
 * Cela évite les collisions de nommage, mais n'empêche pas un code externe d'altérer UserModule.status : la donnée reste publique.
 */
window.CheckoutModule = window.CheckoutModule || {};

window.CheckoutModule.status = "pending_payment";
window.CheckoutModule.total = 150;

window.CheckoutModule.processOrder = function() {
  if (this.status === "pending_payment") {
    console.log("Traitement de la commande de " + this.total + "€...");
  }
};

```

#### `1-ateliers/corrections/3.1/src/counter.js`

```javascript
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
```

#### `1-ateliers/corrections/3.1/src/load-script.js`

```javascript
function loadScript(url, callback) {
  // 1. Création dynamique de la balise
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // 2. Écoute de la fin du chargement
  script.onload = function() {
    console.log("Script chargé avec succès : " + url);
    if (typeof callback === "function") {
      callback();
    }
  };

  script.onerror = function() {
    console.error("Erreur lors du chargement du script : " + url);
  };

  // 3. Injection dans le DOM
  document.body.append(script);
}

```

#### `1-ateliers/corrections/3.1/src/user.js`

```javascript

window.UserModule = window.UserModule || {};
window.UserModule.currentUser = "Alice";
window.UserModule.status = "online";

window.UserModule.renderHeader = function() {
  console.log("Utilisateur connecté : " + this.currentUser + " (" + this.status + ")");
};
```

<!-- END AUTO-GENERATED -->