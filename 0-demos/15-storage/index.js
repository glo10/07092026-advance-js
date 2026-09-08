// stockage
const user = {
    firstname: 'Ali',
    lastname: 'bob',
    age: 45
}

localStorage.setItem('user', JSON.stringify(user)) // sérialisation
const userStr = localStorage.getItem('user') // un string qu'il parser pour rétrouver un obet
const userFromStorage = JSON.parse(userStr) // objet user
localStorage.clear()