# Correction atelier 4.1 : ES2015

## Explications

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

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/4.1

#### `1-ateliers/corrections/4.1/api.js`

```javascript
// Q7
export function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId % 2 === 0) {
        resolve({ id: userId, isIdEven : true});
      } else {
        reject(new Error(`${userId} is odd`));
      }
    }, 0);
  });
}

// Q9
export async function findUsers(url = 'https://api.github.com/users' ) {
  return fetch(url)
  .then(res => res.json())
  .then(users => users.map(({ id, login, url}) => ({ id, login, url })))
  /**
   * Syntaxe longue
   * .then(users => users.map((user) => {
      return { id: user.id, login : user.login, url : user.url }
  }))
   */
  .catch(error => error)
}
```

#### `1-ateliers/corrections/4.1/config.js`

```javascript
const defaultSettings = {
  theme: "dark",
  notifications: true,
  sidebar: false
};

const userSettings = {
  sidebar: true,
  language: "fr"
};

// Q2. Fusion d'objets avec Spread
export const finalSettings = {
  ...defaultSettings,
  ...userSettings
};

// Q3. Récupérer le thème et les autres
export const { theme, ...otherSettings } = finalSettings;
```

#### `1-ateliers/corrections/4.1/email-notification.js`

```javascript
import Notification from './notification'
// Q6. class EmailNotification
export default class EmailNotification extends Notification {
  #apiKey; // Déclaration du champ privé (ES2022)

  constructor(recipient, message, timestamp) {
    super(message, timestamp); // Appel du constructeur parent
    this.recipient = recipient;
    this.#apiKey = "SECRET_KEY";
  }

  // Redéfintion (Overriding)
  send() {
    console.log(`[EMAIL -> ${this.recipient}] (${this.timestamp.toISOString()}) : ${this.message}`);
  }

  get secret() {
    return this.#apiKey; // Accessible uniquement dans la classe
  }
}

```

#### `1-ateliers/corrections/4.1/main.js`

```javascript
import { fetchUserData , findUsers} from './api';
import { finalSettings, theme, otherSettings } from './config'
import EmailNotification from "./email-notification";
// Q8
const user = fetchUserData(1)
// Q10
const users = await findUsers();
const email = new EmailNotification("@", 'hello')
console.log('finalSettings', finalSettings, 'theme', theme)
```

#### `1-ateliers/corrections/4.1/math.js`

```javascript
// Q4. multiplication par facteur
export const sumAndMultiply = (factor, ...numbers) => {
  return numbers
    .map(num => num * factor)
    .reduce((sum, current) => sum + current, 0);
};
```

#### `1-ateliers/corrections/4.1/notification.js`

```javascript
// Q5. classe Notification
export default class Notification {
  constructor(message, timestamp = new Date()) {
    this.message = message;
    this.timestamp = timestamp;
  }

  send() {
    console.log(`[NOTIFICATION] (${this.timestamp.toISOString()}) : ${this.message}`);
  }
}
```

#### `1-ateliers/corrections/4.1/views/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Utilisateurs GitHub</title>
    <style>
        body {
            padding: 50px;
            font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
        }

        a {
            color: #00B7FF;
        }

        ul {
            display: flex;
            justify-content: space-between;
        }
        li {
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body>
    <div id="app"></div>
</body>
</html>l
```

#### `1-ateliers/corrections/4.1/views/templates/details.html`

```html
<h1 id="user-longin"></h1>
<img src="" alt="">
<div>
    <p>Nom: <span id="name"></span></p>
    <p>Entreprise: <span id="enterprise"></span></p>
    <p>Blog: <span id="blog"></span></p>
    <p>Email: <span id="email"></span></p>
    <p>Nombre de dépôts public : <span id="repo"></span></p>
    <p>Followers : <span id="followers"></span></p>
    <p>Date de création : <span id="create-at"></span></p>
</div>

```

#### `1-ateliers/corrections/4.1/views/templates/item.html`

```html
<li>
    <span class="user-login"></span>
    <img src="" alt="" class="user-preview">
    <a href="" class="user-link" target="_blank"></a>
    <a href="" class="user-details">Détails</a>
</li>
```

<!-- END AUTO-GENERATED -->