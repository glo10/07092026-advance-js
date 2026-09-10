# Correction atelier 1.1 : le mot-clé this

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/1.1

#### `1-ateliers/corrections/1.1/package.json`

```json
{
  "name": "1.1",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "vitest"
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

#### `1-ateliers/corrections/1.1/src/bank-account.js`

```javascript
export const bankAccount = {
  solde: 5000,
  withdraw(amount) {
    if (amount > this.solde) {
      throw new Error("Fonds insuffisants");
    }
    this.solde -= amount;
    return { balance: this.solde };
  }
};

```

#### `1-ateliers/corrections/1.1/src/counter.js`

```javascript
export class Counter {
  constructor() {
    this.count = 0;
  }

start() {
    // Solution 1 fonction fléchée
    setTimeout(() => {
      this.count++;
      return `Compteur : ${this.count}`;
    }, 1000);

    // Solution 2 : on stocke le contexte via une variable
    // const self = this;
    // setTimeout(function() {
    //   self.count++;
    //   return `Compteur : ${self.count}`;
    // }, 1000);

    // // Solution 3 : liaison explicite avec bind()
    // setTimeout(function() {
    //   this.count++;
    //   return `Compteur : ${this.count}`;
    // }.bind(this), 1000);
  }
}
```

#### `1-ateliers/corrections/1.1/src/dev-logger.js`

```javascript

export const devLogger = {
  appName: "SaaS-App",
  log(level, message, timestamp) {
    return `[${this.appName}] [${level.toUpperCase()}] (${timestamp}) : ${message}`;
  }
};

```

#### `1-ateliers/corrections/1.1/src/profile.js`

```javascript
export const profile = {
  name: "Alice",
  role: "Développeuse JS/TS",
  getSummary: function() {
    return `${this.name} est ${this.role}.`;
  }
};
```

#### `1-ateliers/corrections/1.1/tests/bank-account.test.js`

```javascript
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  bankAccount
} from "../src/bank-account";

describe("bankAccount", () => {
  beforeEach(() => {
    bankAccount.solde = 5000;
  });

  it("Doit retirer correctement une somme du compte", () => {
    const result = bankAccount.withdraw(1000);
    expect(result).toEqual({
      balance: 4000
    });

    expect(bankAccount.solde).toBe(4000);
  });

  it("Doit retourner le nouveau solde", () => {
    const result = bankAccount.withdraw(2500);
    expect(result.balance).toBe(2500);
  });

  it("Doit lever une erreur si les fonds sont insuffisants", () => {
    expect(() => {
      bankAccount.withdraw(6000);
    }).toThrow("Fonds insuffisants");
  });

  it("Ne doit pas modifier le solde en cas d'erreur", () => {
    expect(() => {
      bankAccount.withdraw(6000);
    }).toThrow();

    expect(bankAccount.solde).toBe(5000);
  });
});
```

#### `1-ateliers/corrections/1.1/tests/counter.test.js`

```javascript
import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  Counter,
} from "../src/counter";

describe("Counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Doit initialiser le compteur à 0", () => {
    const counter = new Counter();
    expect(counter.count).toBe(0);
  });

  test("Doit incrémenter le compteur après 1 seconde", () => {
    const counter = new Counter();
    counter.start();
    vi.advanceTimersByTime(1000);
    expect(counter.count).toBe(1);
  });

  test("Doit avoir le compteur égale à 3 après 3 appels", () => {
    const counter = new Counter();

    counter.start();
    counter.start();
    counter.start();
    vi.advanceTimersByTime(1000);

    expect(counter.count).toBe(3);
  });
});

```

#### `1-ateliers/corrections/1.1/tests/dev-logger.test.js`

```javascript
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  devLogger,
} from "../src/dev-logger";

describe("devLogger", () => {
  it("doit générer correctement le message de log", () => {
    const result = devLogger.log(
      "info",
      "Utilisateur connecté",
      "2026-09-04 17:00:00"
    );

    expect(result).toBe(
      "[SaaS-App] [INFO] (2026-09-04 17:00:00) : Utilisateur connecté"
    );
  });

  it("doit convertir le niveau en majuscules", () => {
    const result = devLogger.log(
      "error",
      "Une erreur est survenue",
      "2026-09-04 17:05:00"
    );

    expect(result).toContain("[ERROR]");
  });

  it("doit utiliser correctement this.appName", () => {
    devLogger.appName = "My-App";

    // solution 1
    const result = devLogger.log(
      "debug",
      "Test",
      "11:00:00"
    );
    // solution 2
    devLogger.log.call("My-App", "debug", "Test", "2026-09-07 11:00");
    // Solution 3
    devLogger.log.apply({ appName : "My-App"}, ["debug", "Test", "2026-09-07 11:00"]);

    expect(result).toBe(
      "[My-App] [DEBUG] (11:00:00) : Test"
    );

    // Nettoyage
    devLogger.appName = "SaaS-App";
  });
});
```

#### `1-ateliers/corrections/1.1/tests/profile.test.js`

```javascript
import { describe, test, expect } from "vitest";
import {
  profile,
} from "../src/profile";

describe("Testing profile", () => {
  test("Doit retourner le résumé du profil", () => {
    // TODO 
    const result = profile.getSummary()
    expect(result).toBe(
      "Alice est Développeuse JS/TS."
    );
  });

  test("Doit utiliser correctement this.name et this.role", () => {
    profile.name = "Marc";
    profile.role = "Designer";

    expect(profile.getSummary()).toBe(
      "Marc est Designer."
    );

    // Nettoyage pour éviter d'impacter les autres tests
    profile.name = "Alice";
    profile.role = "Développeuse JS/TS";
  });
});
```

#### `1-ateliers/corrections/1.1/vitest.config.js`

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