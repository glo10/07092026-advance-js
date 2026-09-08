// Extension cjs possible mais pas obligatoire
// Q7
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId % 2 === 0) {
        resolve({ id: userId, isIdEven : true});
      } else {
        reject(new Error(`${userId} is odd`));
      }
    }, 500);
  });
}

// Q9
async function findUsers(url = 'https://api.github.com/users' ) {
  return fetch(url)
  .then(res => res.json())
  .then(users => users.map(({ id, login, url}) => { id, login, url }))
  /**
   * Syntaxe longue
   * .then(users => users.map((user) => {
      return { id: user.id, login : user.login, url : user.url }
  }))
   */
  .catch(error => error)
}

module.exports = {
    findUsers,
    fetchUserData
}