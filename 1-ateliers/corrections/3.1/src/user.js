
window.UserModule = window.UserModule || {};
window.UserModule.currentUser = "Alice";
window.UserModule.status = "online";

window.UserModule.renderHeader = function() {
  console.log("Utilisateur connecté : " + this.currentUser + " (" + this.status + ")");
};