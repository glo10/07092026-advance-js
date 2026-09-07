export const cleanUsers = rawUsers.map((user) => {
  user.firstName = user.firstName.trim();
  user.lastName = user.lastName.trim();
  const initial = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  const formatedName = (name) => {
    `${name.charAt(0).toUpperCase()} ${name.slice(1).toLowerCase()}`;
  };
  return {
    ...user,
    fullName: `${formatedName(user.firstName)} ${formatedName(user.lastName)}`,
    age: Number(user.age),
    initial,
  };
});

export function filterArticle(items, property, value) {
  return items.filter((item) => item[property] === value);
}

export function computeTotalStock(stocks) {
  return stocks.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
}

export function stockGroupBy(criteria) {
  return this.stocks.reduce((acc, item) => {
    if (item.type === criteria) {
      const { amount } = item;
      // Initialiser la catégorie s'il n'existe pas encore dans l'accumulateur
      acc[criteria] = (acc[criteria] || 0) + amount;
    }
    return acc; // Toujours retourner l'accumulateur
  }, {});
}

export function computeOrderValidateUp(max = 150) {
  return this.orders
    // Garder uniquement les commandes validées
    .filter(order => order.status === "completed")    
    // Transformer chaque commande en somme de son montant total
    .map(order => order.items.reduce((sum, item) => sum + item.price, 0))
    // Filtrer les commandes >= 150€
    .filter(totalAmount => totalAmount >= max)
    //  Total général
    .reduce((totalRevenue, amount) => totalRevenue + amount, 0);
}
