const users = [
    { name: 'Alice', active: true, role: 'admin' },
    { name: 'Bob', active: false, role: 'user' },
    { name: 'Clovis', active: true, role: 'user' }
];

// Uniquement les noms des utilisateurs actifs
const activeUserNames = users
    .filter(user => user.active)
    /**
     * idem que .filter(function(user) { return user.active })
     */
    .map(user => user.name);
/**
 * idem que .map(user =>  {
  return user.name
})
*/