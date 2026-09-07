export const profile = {
  name: "Alice",
  role: "Développeuse JS/TS",
  getSummary: function() {
    return `${this.name} est ${this.role}.`;
  }
};