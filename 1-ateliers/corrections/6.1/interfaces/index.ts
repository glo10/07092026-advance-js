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