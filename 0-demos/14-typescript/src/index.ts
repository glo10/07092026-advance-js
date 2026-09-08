import  type { UserType } from '../types/user-type'
import  type { AdminType } from '../types/admin-type'
import Car from '..//classes/car'


function add(a : number, b: number) {
  return a + b;
}

function divide(a : number, b : number) {
  if (b != 0) return a / b;
  return new Error("divide by 0 imposible");
}

function calculAge(age : number | string) {
  if(typeof age === 'number') {
    // traitement à faire pour un nombre
  } else if(typeof age === 'string')  {
    // traitement à faire pour un string par ex age = parseInt(age)
  }

}

function hello(name?:  string) {
  return `Hello ${name}`
}

// Inférence

let ali = 'Ali'


const beatrice : UserType = {
  firstname: 'Beatrice',
  lastname: 'C',
  isAdmin: false
}

const claude : UserType & AdminType = {
  firstname: 'Claude',
  lastname: 'C',
  isAdmin: true,
  email: '@',
  dept: 'IT',
  id: 1
}



const renault = new Car(1, "ref125", "3008", "MX-4080-DF", new Date())
console.log('ali', ali, 'renault', renault)
