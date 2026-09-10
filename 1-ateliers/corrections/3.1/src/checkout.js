/**
 * Le Namespace Pattern limite la pollution en ne créant qu'une seule variable globale par grand domaine applicatif (ex: UserModule).
 * Cela évite les collisions de nommage, mais n'empêche pas un code externe d'altérer UserModule.status : la donnée reste publique.
 */
window.CheckoutModule = window.CheckoutModule || {};

window.CheckoutModule.status = "pending_payment";
window.CheckoutModule.total = 150;

window.CheckoutModule.processOrder = function() {
  if (this.status === "pending_payment") {
    console.log("Traitement de la commande de " + this.total + "€...");
  }
};
