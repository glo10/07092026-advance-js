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
