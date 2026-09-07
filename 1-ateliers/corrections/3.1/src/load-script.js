function loadScript(url, callback) {
  // 1. Création dynamique de la balise
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // 2. Écoute de la fin du chargement
  script.onload = function() {
    console.log("Script chargé avec succès : " + url);
    if (typeof callback === "function") {
      callback();
    }
  };

  script.onerror = function() {
    console.error("Erreur lors du chargement du script : " + url);
  };

  // 3. Injection dans le DOM
  document.body.append(script);
}
