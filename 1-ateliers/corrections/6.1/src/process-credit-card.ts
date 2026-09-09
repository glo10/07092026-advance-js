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