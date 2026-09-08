// Q5. classe Notification
export default class Notification {
  constructor(message, timestamp = new Date()) {
    this.message = message;
    this.timestamp = timestamp;
  }

  send() {
    console.log(`[NOTIFICATION] (${this.timestamp.toISOString()}) : ${this.message}`);
  }
}