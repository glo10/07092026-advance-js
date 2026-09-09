import { displayDistance, getUserCoordinates } from "./gps"
import { findUsers } from "./api"

// sans web worker
Promise.all([findUsers(), getUserCoordinates(), displayDistance()])
.then(([users, coords, distance]) => {
    console.log('users', users)
    console.log('coords', coords)
    console.log('distance', distance)
} )

/**
 * Avec web worker
 */
const apiWebWorker = new Worker('./workers/api-web-worker.js')
apiWebWorker.onmessage = (event) => {
    const  { status, data, message } = event.data
    if(status === 'success') {
        console.log('users depuis le worker', data)
    } else  {
        console.error('erreur fetch users', message)
    }
}

apiWebWorker.onerror = (error) => {
    console.error('Erreur worker', error)
}

apiWebWorker.postMessage('FETCH_USERS')

// Les assets depuis service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./workers/cache-service-worker.js')
    .then(registration => {
      console.log('Service Worker enregistré avec succès, scope:', registration.scope);
    })
    .catch(error => {
      console.error("Échec de l'enregistrement du Service Worker :", error);
    });
}



              
