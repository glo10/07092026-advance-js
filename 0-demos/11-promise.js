// A exécuter avec NODE : node 11-promise.js
// Response est un objet de type Response qui a une méthode json() qui transforme les infos en json et retourne une promesse
const photosPromise = fetch('https://jsonplaceholder.typicode.com/photos').then(response => response.json())
const usersPromise = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
const all = Promise.all([photosPromise, usersPromise]) // les 2 sont lancées en même temps
all
// On rentre dans ce then uniquement si les 2 reponses sont favorables
.then(([photos, users]) => { // idem que const [photos, users] = data ou idem que const photos = data[0] etconst users = data[1]
    // data est un tableau contenant les résultats dans l'ordre du tableau des promesses
    console.log('photos', photos.length, 'users', users.length)
})
.catch(error => { // au moins 1 échoue on capture l'erreur
    console.error('catch from photos', error)
})
.finally(() => { // optionnel, peu importe l'issu succès ou échec ~ traitement par défaut quoi qu'il arrive
    console.log('finally')
}) 

// A bannir ou mauvaise pratique d'imbriquer des fetch dans des fetch
fetch('https://jsonplaceholder.typicode.com/albums')
.then(res => res.json())
.then((albums) => {
    const albumFirstUser = albums[0]
    const { userId } = albumFirstUser
    const user = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(u => u.json())
    console.log('first user', user)
})
.catch(error => console.log('Catch from albums', error))

try {
    // Pour séparer les traitements et mettre en pause le résultat on utilise async await
    const usersGitHub = await fetch('https://api.github.com/users').then(data => data.json())
    // on n'a pas le nom de l'auteur mais son ID
    const mojombo = usersGitHub.find((user) => user.login === "mojombo")
    // A partir de son ID, on veut récupérer son nom et le reste des infos
    await fetch(`api.example?user_id=${mojombo.id}`).then(u => u.json())
} catch(error) {
    console.log('catch from GitHub', error)
}

const myPromise = new Promise((resolve, reject) => {
    const random = Math.ceil(Math.random() * 1000)
    console.log('random', random)
    if(random % 2 === 0) resolve('OK')
    else reject('KO')
});
try {
    setTimeout(() => {
        myPromise
        .then(res => console.log('resolve', res))
        .catch(error => console.error('reject', error))
    }, 2000)
} catch(error) {
    console.error('Catch setimeout error')
}