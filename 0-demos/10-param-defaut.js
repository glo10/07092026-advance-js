function hello(name) {
    return `Bonjour ${name}`
}
// notation courte de hello
const hi = (name) => `Bonjour ${name}`;
console.log(hi('Fatou'));

const fn1 =  (age = 18) => {}
const fn2 = (numbers = [1,2,3])  => {}
const fn3 = (user = { firstname : 'bob'}) => {}
const fn4 = (isOld = false) => { }
const fn6 = (firstname = 'Ali') => {}