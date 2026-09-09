export default class Notification {
  // Notation conscise
  // encapsulation protected pour permettre l'héritage aux classes filles
  constructor(protected _message: string, protected _timestamp: Date = new Date()) {}
  public get message() : string {
    return this._message
  }

  public get timestamp() : Date {
    return this._timestamp
  }

  public set timestamp(tmz : Date)  {
    this._timestamp = tmz
  }

  public send(): void {
    console.log(`[NOTIFICATION] (${this._timestamp.toISOString()}) : ${this._message}`);
  }
}