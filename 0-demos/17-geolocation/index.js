
(function(){
  if (!navigator.geolocation) {
    console.error("Géolocalisation n'est pas supporté par le navgigateur");
    return;
  }
  let id;
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
  // Obtenir la position actuelle (latitude, longitude, précision).
  navigator.geolocation.getCurrentPosition(
    (position) => console.log('Lat', position.coords.latitude, 'Lng', position.coords.longitude),
    (error) => console.error('[KO]', error),
    options
  );

  // Suivre les déplacements en temps-réel
  id = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      if(latitude === 48.8893946 && longitude ===  2.2428192) {
        console.log('Vous êtes arrivé !');
        navigator.geolocation.clearWatch(id); // Arrêt du suivi              
      } else {
        console.log('suivi temps réel', position)
      }
    },
    (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.error('Accès refusée');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error('Localisation indisponible');
          break;
        case error.TIMEOUT:
          console.error("Temps écoulé");
          break;
        case error.UNKNOWN_ERROR:
          console.error("Erreur inconnu");
          break;
      }
    },
    options
  );
})()
              