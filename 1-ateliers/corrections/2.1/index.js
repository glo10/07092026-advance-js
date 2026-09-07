export const cleanUsers = rawUsers.map((user) => {
  // copie de user pour ne pas modifier les infos directement
  const newUser =  { ...user } 
  newUser.firstName = newUser.firstName.trim();
  newUser.lastName = newUser.lastName.trim();
  const initial = `${newUser.firstName.charAt(0)}${newUser.lastName.charAt(0)}`;
  const firstLetterUpperCase = (name) => {
    `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
  };
  newUser.fullName = `${firstLetterUpperCase(user.firstName)} ${firstLetterUpperCase(user.lastName)}`
  newUser.age = Number(user.age)
  newUser.initial = initial
  return newUser
});

export function filterArticle(items, property, value) {
  return items.filter((item) => Object.hasOwn(item, property) && item[property] === value);
}

export function filterArticleandCompareByIntern(data, key, operator, value) {
  return data.filter(article => compareByIntern(article[key], operator, value));
}

export function compareByIntern(value, operator, target) {
  switch (operator) {
    case "=":  return value === target;
    case ">":  return value > target;
    case ">=": return value >= target;
    case "<":  return value < target;
    case "<=": return value <= target;
    default:   return false;
  }
}
 
 
const catHardware = filterArticle(articles, 'category', 'Hardware')
const hardwareEqual150 = filterArticle(catHardware, 'price', 150);
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
