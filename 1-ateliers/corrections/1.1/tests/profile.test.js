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