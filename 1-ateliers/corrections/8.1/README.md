# Correction atelier 8.1 : tests

## Explications

### Pattern AAA (Arrange-Act-Assert) : Structure fondamentale d'un test unitaire

1. *Arrange* : préparer les données de test.
2. *Act* : exécuter la fonction à tester.
3. *Assert* : vérifier que le résultat obtenu correspond au résultat attendu.


### Test d'exception avec `toThrow`

Lors du test de levée d'erreur, il faut passer une fonction de rappel par exemple  `() => computeTotal(...)` à `expect()`. Si on exécutait la fonction directement à l'intérieur, l'erreur arrêterait l'exécution du fichier de test avant que l'assertion ne puisse la capturer.

### Pourquoi moquer ?

Dans un test d'intégration du service applicatif, on souhaite valider la logique métier (`fullName`, `isAdult`) sans dépendre d'un vrai serveur API (qui pourrait être indisponible ou lent).

#### `mockResolvedValueOnce` vs `mockRejectedValueOnce`

Permet de simuler le comportement asynchrone d'une promesse, soit lorsqu'elle réussit, soit lorsqu'elle échoue, afin de tester tous les parcours possibles.

### Test End-to-End (E2E)

Contrairement aux tests unitaires, le test E2E s'exécute au sein d'une instance réelle d'un navigateur web. Il teste l'application complète (Front-end, Back-end, Base de données).

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/8.1

#### `1-ateliers/corrections/8.1/package.json`

```json
{
  "name": "8.1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "vitest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vitest": "^5.0.0"
  }
}

```

#### `1-ateliers/corrections/8.1/tests/api.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { fetchUserData, findUsers } from '../../6.1/src/api';

describe('Testing fetchUserData()', () => {
  it('should resolve with UserData for an even ID', async () => {
    const data = await fetchUserData(4);
    expect(data).toEqual({ id: 4, isIdEven: true });
  });

  it('should reject with an error for an odd ID', async () => {
    await expect(fetchUserData(3)).rejects.toThrow('3 is odd');
  });
});

describe('Testing findUsers()', () => {
  it('should fetch and map users correctly', async () => {
    const mockUsers = [
      { id: 1, login: 'alice', url: 'https://api.github.com/users/alice', node_id: '123' },
      { id: 2, login: 'bob', url: 'https://api.github.com/users/bob', node_id: '456' }
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockUsers)
    }));

    const result = await findUsers();

    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users');
    expect(result).toEqual([
      { id: 1, login: 'alice', url: 'https://api.github.com/users/alice' },
      { id: 2, login: 'bob', url: 'https://api.github.com/users/bob' }
    ]);

    vi.unstubAllGlobals();
  });

  it('should catch network errors and return the error', async () => {
    const networkError = new Error('Network Failure');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError));

    const result = await findUsers();

    expect(result).toBe(networkError);

    vi.unstubAllGlobals();
  });
});
```

#### `1-ateliers/corrections/8.1/tests/config.test.ts`

```typescript
import { describe, it, expect, vi } from "vitest";
import { finalSettings, theme, otherSettings } from "../../6.1/src/config";

describe("Testing Settings Constants", () => {
  it("should correctly merge default and user settings", () => {
    expect(finalSettings).toEqual({
      theme: "dark",
      notifications: true,
      sidebar: true,
      language: "fr",
    });
  });

  it("should correctly extract theme", () => {
    expect(theme).toBe("dark");
  });

  it("should correctly extract remaining settings", () => {
    expect(theme).toBe("dark");
  });
});

```

#### `1-ateliers/corrections/8.1/tests/data-storage.test.ts`

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { DataStorage } from "../../6.1/src/data-storage";

describe("Testing DataStorage", () => {
  let storage: DataStorage<string>;

  beforeEach(() => {
    storage = new DataStorage<string>();
  });

  it("Should be empty", () => {
    expect(storage.getAll()).toEqual([]);
  });

  it("Should add Apple", () => {
    storage.addItem("Apple");
    expect(storage.getAll()).toEqual(["Apple"]);
  });

  it("Should get Cherry from index 2", () => {
    storage.addItem("Apple");
    storage.addItem("Banane");
    storage.addItem("Cherry");
    expect(storage.getItem(2)).toBe("Cherry");
  });

  it("Should have got undefined when index not exist", () => {
    storage.addItem("Apple");
    expect(storage.getItem(5)).toBeUndefined();
  });

  it("Should work with interface User", () => {
    interface User {
      id: number;
      name: string;
    }
    const userStorage = new DataStorage<User>();
    const alice = { id: 1, name: "Alice" };
    userStorage.addItem(alice);
    expect(userStorage.getItem(0)).toEqual(alice);
  });

  it("Should work with Car Interface", () => {
    interface Car {
      data: {
        reference: string;
        categories: Array<string>;
      };
      error?: Error;
    }
    const cars = [
      {
        data: {
          reference: "ref123456",
          categories: ["electrique"],
          isElectric: true,
        },
      },
        {
        data: {
          reference: "ref7891011",
          categories: ["SUV", "4*4"],
          isElectric: false,
        },
      },
    ];
    const carStorage = new DataStorage(cars);
    carStorage.addItem(cars[1]);
    expect(carStorage.getItem(1)).toEqual(cars[1]);
  });
});

```

#### `1-ateliers/corrections/8.1/tests/email-notification.test.ts`

```typescript
import { describe, it, expect, vi } from "vitest";
import EmailNotification from "../../6.1/src/email-notification";

describe("Testing EmailNotification Class", () => {
  it("should have john@doe.com as email", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!");
    expect(emailNotif.recipient).toBe("john@doe.com");
    consoleSpy.mockRestore();
  });

  it("should have api key equals to secret", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const dt = new Date();
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!", dt);
    expect(emailNotif.apiKey).toBe("secret");
    emailNotif.send();
    consoleSpy.mockRestore();
  });

  it("should call console.log with email, date and message", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const dt = new Date();
    const emailNotif = new EmailNotification("john@doe.com", "secret", "Welcome!", dt);
    emailNotif.send();

    expect(consoleSpy).toHaveBeenCalledWith(
      `[EMAIL -> john@doe.com] (${dt.toISOString()}) : Welcome!`,
    );
    consoleSpy.mockRestore();
  });
});

```

#### `1-ateliers/corrections/8.1/tests/math.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { sumAndMultiply } from '../../6.1/src/math';

describe('Testing sumAndMultiply()', () => {
  it('should multiply each number by factor and return the sum', () => {
    // (1 * 2) + (2 * 2) + (3 * 2) = 12
    const result = sumAndMultiply(2, 1, 2, 3);
    expect(result).toBe(12);
  });

  it('should return 0 when no extra numbers are provided', () => {
    const result = sumAndMultiply(5);
    expect(result).toBe(0);
  });
});

```

#### `1-ateliers/corrections/8.1/tests/notification.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import Notification from '../../6.1/src/notification';

describe('Testing Notification Class', () => {
  it('should instantiate with "Hello world" notification', () => {
    const notif = new Notification('Hello World');
    expect(notif.message).toBe('Hello World');
  });

    it('should instantiate with a default date', () => {
    const notif = new Notification('Hello World');
    expect(notif.timestamp).toBeInstanceOf(Date);
  });

  it('should call console.log on send()', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const date = new Date();
    const notif = new Notification('Test Message', date);

    notif.send();

    expect(consoleSpy).toHaveBeenCalledWith(
      `[NOTIFICATION] (${date.toISOString()}) : Test Message`
    );
    consoleSpy.mockRestore();
  });
});

```

#### `1-ateliers/corrections/8.1/tests/process-credit-card.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { processCreditCard } from "../../6.1/src/process-credit-card";
import { PaymentRequest } from "../../6.1/interfaces";

describe("Testing processCreditCard", () => {
  beforeEach(() => {
    // Mock de Math.random pour rendre le transactionId prédictible
    vi.spyOn(Math, "random").mockReturnValue(0.123456); // ce résultat * 1000000 = 123456
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should refused a payment when amount=0", () => {
    const payment: PaymentRequest = { amount: 0 , currency: 'EUR'};
    const result = processCreditCard(payment);

    expect(result).toEqual({
      success: false,
      error: "Le montant doit être supérieur à 0.",
    });
  });

  it("Should reject the payment when amount < 0", () => {
    const payment: PaymentRequest = { amount: -50 };

    const result = processCreditCard(payment);

    expect(result).toEqual({
      success: false,
      error: "Le montant doit être supérieur à 0.",
    });
  });

  it("Should have a successfully payment with transition ID", () => {
    const payment: PaymentRequest = { amount: 100 };

    const result = processCreditCard(payment);

    expect(result).toEqual({
      success: true,
      transactionId: "TX-123456",
    });
  });
});
```

#### `1-ateliers/corrections/8.1/vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 1000,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    environmentMatchGlobs: [
      [
        'tests/*/*.test.[c|m]js',
        'tests/*/*integration*.test.{js,mjs,cjs,ts}',
        'node',
      ]
    ],
    exclude: ['node_modules']
  }
})
```

<!-- END AUTO-GENERATED -->