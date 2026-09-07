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
