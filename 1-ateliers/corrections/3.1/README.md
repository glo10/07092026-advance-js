# Correction Atelier 3.1 : les architectures pré-ES2015

## app.js

Lorsqu'un script classique est placé dans le <head> sans attribut d'asynchronisme, le navigateur interrompt le parsing du HTML pour télécharger et exécuter le script immédiatement. Au moment où app.js s'exécute, le navigateur n'a pas encore analysé la balise <body> ni le <button>. L'appel document.getElementById("title") renvoie donc null, ce qui provoque une erreur lors de la lecture de la propriété innerText.

## analytics.js


L'erreur dans app.js stoppe son exécution. Ensuite, le navigateur exécute analytics.js. Si titleText n'a pas été déclarée avec var plus haut (ou si son affectation a échoué), cela lève une ReferenceError: titleText is not defined.
Si app.js met 5 secondes à charger, le rendu de la page reste totalement bloqué pendant 5 secondes (écran blanc), car le parsing du DOM est suspendu par le script bloquant dans le <head>.

## user.js

L'appel de renderHeader() affiche : "Utilisateur connecté : Alice (pending_payment)". La variable status déclarée dans checkout.js a écrasé la variable status de user.js car toutes deux ont été rattachées à l'objet global window.

## Conclusions

Cet exercice souligne 2 problèmes majeurs :

1. Absence d'isolation de code : Les variables globales partagent le même espace mémoire (window). Tout fichier peut modifier par inadvertance l'état interne d'un autre fichier.

2. Absence d'isolation sémantique : Il est impossible de savoir d'où provient une variable ou une fonction. Dans un gros projet avec 50 fichiers JS, déterminer quel script a déclaré status devient très complexe.