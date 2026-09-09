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