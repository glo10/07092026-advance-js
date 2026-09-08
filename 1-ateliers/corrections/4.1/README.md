

### Correction atelier 4.1 : ES2015

## Sources

- [api.js](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/api.js)
- [config](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/config.js)
- [email-notification](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/email-notification.js)
- [notification](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/math.js)
- [main.js](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/main.js)
- [math](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/4.1/math.js)

## explications

- **`const` vs `let` :** on privilégie `const` par défaut. Il n'interdit pas la mutation du contenu d'un objet/tableau, mais garantit que la variable ne sera pas réaffectée.
- **Destructuring dans les paramètres :** au lieu de lire `options.protocol`, on extrait la propriété directement à la réception avec valeur par défaut : `{ protocol = "https" } = options`.
- **Objets littéraux avancés (*Property shorthand*) :** quand le nom de la clé et le nom de la variable sont identiques, `{ id: id }` se simplifie directement en `{ id }`.
- **Retour implicite des fonctions fléchées :** pour retourner un objet littéral de manière implicite dans une fonction fléchée, on l'entoure de parenthèses : `({ id, name })`
- **Spread (`...`) sur les objets :** l'opérateur "étale" les propriétés. En cas de collision de clés, la dernière valeur l'emporte (`userSettings.sidebar` écrase `defaultSettings.sidebar`).
- **Rest Parameter** le paramètre de reste (`...numbers`) regroupe tous les arguments supplémentaires dans un **tableau JavaScript** pour utiliser immédiatement `.map()` ou `.reduce()`.
- **`super()` :** dans une classe dérivée (`extends`), il est **obligatoire** d'appeler `super()` dans le constructeur avant de pouvoir utiliser `this`.
-  **Privatisation (`#`) :** les champs précédés de `#` sont strictement encapsulés et protégés par le moteur JS à l'exécution.
- **`async / await` :** sucre syntaxique au-dessus des Promesses. `await` stoppe l'exécution de la fonction `async` jusqu'à ce que la Promesse soit résolue ou rejetée, rendant le code asynchrone aussi lisible qu'un code synchrone.
- **Gestion d'erreur :** l'instruction `reject()` d'une Promesse est capturée par le bloc `catch` classique d'un bloc `try...catch` lorsqu'on utilise `await`.