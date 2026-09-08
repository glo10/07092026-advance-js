import type { CarInterface } from "../interfaces/car-interface";

export default class Car implements CarInterface {
  constructor( private id: number, public ref: string, public model : string, public immatriculation: string, public makeAt: Date)  {}
}