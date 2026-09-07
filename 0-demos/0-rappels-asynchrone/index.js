
const user = {
  nom: "Alice",
  hello() {
    const self = this
    setTimeout(function() {
      console.log('this', this)
      console.log('self', self)
      console.log(selg.nom); // undefined !
      // "this" pointe sur window/global car la fonction anonyme est appelée séparément.
    }, 1000);
  },
  helloArrowFn() {
    setTimeout(() => {
      console.log(this.nom); // "Alice", conserve le "this" de l'objet user.
    }, 1000);
  }
};
    
user.hello();