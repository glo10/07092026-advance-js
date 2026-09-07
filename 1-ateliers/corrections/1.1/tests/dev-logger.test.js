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