/**
 * Ici this = window donc this.name = undefined et this.lang = undefined
 */
function introduceDev1() {
  console.log(`Je suis ${this.name} et je code en ${this.lang}`);
}
const alice = {
  name: " Alice",
  lang: "JS"
}
introduceDev1() // this = window ou this = globalThis avec node
// On donne le contexte l'objet alice => this.name = alice this.lang = JS
introduceDev1.call(alice)

function introduceDev2(lang1, lang2) {
  console.log(`Je suis ${this.name} et je code en ${lang1} et ${lang2}`);
}
const bob = { name: 'Bob' };
introduceDev1.call(bob, 'Java', 'PHP') // on donne le contexte bob donc this = bob

function introduceDev3(name, lang, isLead) {
  this.name = name
  this.lang = lang
  this.isLead = isLead
  console.log(`Je suis ${this.name} et je code en ${lang} et est-ce que je suis un Lead Dev : ${isLead ? 'oui' : 'non'}`);
}
const charles = { name: 'charles', lang: 'PHP' };
/**
* this = charles mais on modifie les informations par les paramètres
* C'est mieux de passer par une class pour ce cas
*/
introduceDev3.call(charles, 'charles', 'Python', true);