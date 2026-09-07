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