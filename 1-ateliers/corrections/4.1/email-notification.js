import Notification from './notification'
// Q6. class EmailNotification
export default class EmailNotification extends Notification {
  #apiKey; // Déclaration du champ privé (ES2022)

  constructor(recipient, message, timestamp) {
    super(message, timestamp); // Appel du constructeur parent
    this.recipient = recipient;
    this.#apiKey = "SECRET_KEY";
  }

  // Redéfintion (Overriding)
  send() {
    console.log(`[EMAIL -> ${this.recipient}] (${this.timestamp.toISOString()}) : ${this.message}`);
  }

  get secret() {
    return this.#apiKey; // Accessible uniquement dans la classe
  }
}
