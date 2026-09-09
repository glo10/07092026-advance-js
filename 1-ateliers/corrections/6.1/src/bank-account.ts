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