import Notification from './notification';

export default class EmailNotification extends Notification {
  constructor(
    private _recipient: string,
    private _apiKey: string,
    message: string, 
    timestamp: Date = new Date()
  ) {
    // Transmet les valeurs au constructeur parent
    super(message, timestamp);
  }

  public override send(): void {
    console.log(`[EMAIL -> ${this.recipient}] (${this.timestamp.toISOString()}) : ${this.message}`);
  }

  public get apiKey(): string {
    return this._apiKey;
  }

  public get recipient(): string {
    return this._recipient;
  }

  public set recipient(value: string) {
    this._recipient = value;
  }
}