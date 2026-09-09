# Correction atelier 6 : TypeScript

## Fichiers

- [cf. sources en TypeScript](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/6.1/src)
- [cf. interfaces](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/6.1/interfaces)
- [cf. types](https://github.com/glo10/07092026-advance-js/tree/main/1-ateliers/corrections/6.1/types)

---

## Explications 

- **Configuration `tsconfig.json` minimal :**

```json
{
  "compilerOptions": {
    "target": "ES2022", // ou autre 
    "module": "commonjs", // ou autre
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- **Propriétés :** en écrivant `constructor(public owner: string, private balance: number)`, TypeScript génère automatiquement les propriétés de la classe et leur affectation. C'est l'équivalent concis de :
```typescript
// version longue
private balance: number;
constructor(balance: number) { this.balance = balance; }
// version courte
constructor(public owner: string, private balance: number)
```

- **Interface vs Type :** on privilégie généralement les interfaces pour décrire la forme des objets métier (autorisant l'extension avec `extends`) et les `type` pour les alias d'unions, de primitives ou de signatures de fonctions.

- **Visibilité à la compilation :** les mots-clés `private` ou `protected` de TypeScript apportent une sécurité **au moment de la compilation**. Une fois le code transpilé en JavaScript ES6, ces modificateurs disparaissent.

- **Abstraction & Sécurité :** la généricité (`<T>`) permet de créer des structures de données réutilisables (conteneurs, wrappers, réponses HTTP) sans sacrifier le typage fort. `T` agit comme un paramètre de type qui sera remplacé lors de l'instanciation (`DataStorage<User>`).
* **Inférence des génériques :** lors de l'appel `genericApiresponse(data)`, il n'est pas nécessaire d'écrire `genericApiresponse<User>(data)`.
TypeScript est capable de déduire la valeur de `T` en observant le type de l'argument passé.