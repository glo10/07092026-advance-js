
# Correction atelier 5.1 : les packages et la transpilation

## Explications

- `require()` en CommonJS est une **fonction** exécutée au moment du **runtime** (à l'exécution).L'importation est synchrone et bloquante à l'iverse de `import` en ES Modules analysée de manière **statique** (au moment du *parsing*, avant l'exécution du code). Cela permet aux outils (bundlers) de faire du **Tree-Shaking** (élimination du code mort non utilisé), ce qui est impossible avec CommonJS.

- ** `@babel/core` et `@babel/preset-env` des outils nécessaires uniquement pour builder, transpiler ou tester le code en devéloppement. En production, le code compilé final n'a plus besoin de Babel pour s'exécuter.

- **@babel/cli** outil pour exécuter Babel en ligne de commande pour automatiser ce processus de transpilation à partir d'un script sur package.json
- **Les 3 étapes de Babel :**
  - **Parsing (Analyse) :** Babel prend le code source (chaîne de caractères) et le transforme en une structure d'arbre logique appelée **AST** (*Abstract Syntax Tree*).
  - **Transforming (Transformation) :** Babel parcourt l'AST. Des **plugins** modifient, remplacent, ajoutent ou suppriment des nœuds de l'arbre (par exemple en remplaçant un nœud de type `ArrowFunctionExpression` par un nœud de type `FunctionDeclaration`).
  - **Generation (Génération) :** Babel parcourt l'AST transformé et recrée une nouvelle chaîne de caractères représentant le code JavaScript final transpilé en par rapport à la cible par exemple ES5.

---

## Bonus

9. Il faut ajouter un **plugin** spécifique (par exemple `@babel/plugin-proposal-pipeline-operator`) car 
c'est une petite unité de code responsable de la transformation d'une **seule** fonctionnalité syntaxique spécifique (ex: convertir uniquement les fonctions fléchées ou les propriétés privées).
A l'inverse d'un **preset**, un **ensemble pré-configuré de plugins**. `@babel/preset-env` ne regroupe que les fonctionnalités ayant atteint un stade de maturité officiel (Stage 3/4 au TC39).

Pour une proposition très récente ou expérimentale, il faut ajouter le plugin individuel manuellement depuis la configuration `"plugins": [...]`.

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/5.1

#### `1-ateliers/corrections/5.1/babel.config.json`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11"
        },
        "corejs": 3
      }
    ]
  ]
}
```

#### `1-ateliers/corrections/5.1/package.json`

```json
{
  "name": "5.1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "start": "node src/main.cjs",
    "build": "babel src -d dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.29.7",
    "@babel/core": "^7.29.7",
    "@babel/preset-env": "^7.29.7"
  }
}

```

#### `1-ateliers/corrections/5.1/src/main.cjs`

```
const myMath = require('./modules/my-math');

console.log('add', myMath.add(2,4));
console.log('multiply', myMath.multiply(2,4));
console.log('minus', myMath.minus(2,4));

try {
    console.log('divide', divide(10,2));
} catch (error) {
    console.error('Error divide', error)
}
```

#### `1-ateliers/corrections/5.1/src/modules/my-math.cjs`

```
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function minus(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b != 0) return a / b;
  throw new Error("divide by 0 imposible");
}

module.export = {
  add,
  multiply,
  minus,
  divide,
};

```

<!-- END AUTO-GENERATED -->