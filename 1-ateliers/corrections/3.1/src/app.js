// Solution B : Attendre l'événement DOMContentLoaded dans app.js
document.addEventListener("DOMContentLoaded", function() {
  var titleText = document.getElementById("title").innerText;
  console.log("App initialisée avec succès :", titleText);
});