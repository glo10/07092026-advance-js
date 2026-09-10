# Correction atelier 6 : TypeScript

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
- Utilisez `npx tsc --init` pour la générer ou encore mieux pour les projets Front, utilisez un outil tels que `vite` ou l'équivalent pour créer votre projet avec une configuration automatique en fonction des outils utilisés (en répondant aux questions posées, l'outil génère la config correspondante)
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

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/6.1/

#### `1-ateliers/corrections/6.1/interfaces/index.ts`

```typescript
export interface UserData {
  id: number;
  isIdEven: boolean;
}

export interface GitHubUser {
  id: number;
  login: string;
  url: string;
}

export interface DefaultSettings {
  theme: string;
  notifications: boolean;
  sidebar: boolean;
}

export interface UserSettings {
  sidebar: boolean;
  language: string;
}

export interface PaymentRequest {
  amount: number;
  currency: "EUR"|"USD"|"Yuan"|"GBP";
  description?: string;
}

export interface CreditCardPayment extends PaymentRequest {
  cardNumber: string;
  cvv: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  errorMessage?: string;
}
```

#### `1-ateliers/corrections/6.1/src/api.ts`

```typescript
import { UserData, GitHubUser, ApiResponse } from '../interfaces'
export function fetchUserData(userId: number): Promise<UserData> {
  return new Promise<UserData>((resolve, reject) => {
    setTimeout(() => { // setTimeout à supprimer en prod, ici uniquement pour simuler le trafic réseau
      if (userId % 2 === 0) {
        resolve({ id: userId, isIdEven: true });
      } else {
        reject(new Error(`${userId} is odd`));
      }
    }, 100);
  });
}

export async function findUsers(url: string = 'https://api.github.com/users'): Promise<GitHubUser[] | Error> {
  return fetch(url)
    .then((res: Response) => res.json())
    .then((users: GitHubUser[]) =>
      users.map(({ id, login, url }) => ({ id, login, url }))
    )
    .catch((error: Error) => error);
}

export function GenericApiResponse<T>(data: T): ApiResponse<T> {
  return {
    status: "success",
    data: data
  };
}
```

#### `1-ateliers/corrections/6.1/src/bank-account.ts`

```typescript
class BankAccount {
  constructor(
    private readonly accountNumber: string,
    private owner: string,
    private balance: number = 0
  ) {}

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public get currentBalance(): number {
    return this.balance;
  }
}
```

#### `1-ateliers/corrections/6.1/src/config.ts`

```typescript
import { DefaultSettings, UserSettings } from "../interfaces";
import { Settings } from "../types";
const defaultSettings: DefaultSettings = {
  theme: "dark",
  notifications: true,
  sidebar: false
};

const userSettings: UserSettings = {
  sidebar: true,
  language: "fr"
};

// Q2. Fusion d'objets avec Spread (typé explicitement avec l'union/intersection)
export const finalSettings: Settings = {
  ...defaultSettings,
  ...userSettings
};

// Q3. Récupérer le thème et les autres
export const theme: string = finalSettings.theme;
export const otherSettings: Omit<Settings, 'theme'> = (({ theme, ...rest }) => rest)(finalSettings);

// Alternative native TypeScript pour la déstructuration directe (typage inféré automatiquement) :
// export const { theme, ...otherSettings } = finalSettings;
```

#### `1-ateliers/corrections/6.1/src/data-storage.ts`

```typescript
export class DataStorage<T> {
  constructor(private items : T[] = []) {}
  
  public addItem(item: T): void {
    this.items.push(item);
  }

  public getItem(index: number): T | undefined {
    return this.items[index];
  }

  public getAll(): readonly T[] {
    return this.items;
  }
}
```

#### `1-ateliers/corrections/6.1/src/email-notification.ts`

```typescript
import Notification from './notification';

export default class EmailNotification extends Notification {
  constructor(
    private _recipient: string,
    private _apiKey: string,
    message: string, 
    timestamp: Date = new Date()
  ) {
    // Transmet les valeurs au constructeur parent
    super(message, timestamp);
  }

  public override send(): void {
    console.log(`[EMAIL -> ${this.recipient}] (${this.timestamp.toISOString()}) : ${this.message}`);
  }

  public get apiKey(): string {
    return this._apiKey;
  }

  public get recipient(): string {
    return this._recipient;
  }

  public set recipient(value: string) {
    this._recipient = value;
  }
}
```

#### `1-ateliers/corrections/6.1/src/math.ts`

```typescript
// Q4. multiplication par facteur
export const sumAndMultiply = (factor: number, ...numbers: number[]): number => {
  return numbers
    .map((num: number) => num * factor)
    .reduce((sum: number, current: number) => sum + current, 0);
};
```

#### `1-ateliers/corrections/6.1/src/notification.ts`

```typescript
export default class Notification {
  // Notation conscise
  // encapsulation protected pour permettre l'héritage aux classes filles
  constructor(protected _message: string, protected _timestamp: Date = new Date()) {}
  public get message() : string {
    return this._message
  }

  public get timestamp() : Date {
    return this._timestamp
  }

  public set timestamp(tmz : Date)  {
    this._timestamp = tmz
  }

  public send(): void {
    console.log(`[NOTIFICATION] (${this._timestamp.toISOString()}) : ${this._message}`);
  }
}
```

#### `1-ateliers/corrections/6.1/src/process-credit-card.ts`

```typescript
import { PaymentProcessor } from "../types";

// ou export const processCreditCard = (payment : PaymentRequest) : PaymentResult => {
export const processCreditCard : PaymentProcessor = (payment) => {
  if (payment.amount <= 0) {
    return {
      success: false,
      error: "Le montant doit être supérieur à 0."
    };
  }

  return {
    success: true,
    transactionId: `TX-${Math.floor(Math.random() * 1000000)}`
  };
};
```

#### `1-ateliers/corrections/6.1/types/index.ts`

```typescript
import { DefaultSettings, UserSettings } from "../interfaces";
export type Settings = DefaultSettings & UserSettings;
export type PaymentResult = {
  success: boolean;
  transactionId?: string;
  error?: string;
};
export type PaymentProcessor = (payment: PaymentRequest) => PaymentResult;
export type User = {
  id: number;
  username: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
};

```

<!-- END AUTO-GENERATED -->