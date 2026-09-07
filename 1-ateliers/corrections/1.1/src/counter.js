export class Counter {
  constructor() {
    this.count = 0;
  }

start() {
    // Solution 1 fonction fléchée
    setTimeout(() => {
      this.count++;
      return `Compteur : ${this.count}`;
    }, 1000);

    // Solution 2 : on stocke le contexte via une variable
    // const self = this;
    // setTimeout(function() {
    //   self.count++;
    //   return `Compteur : ${self.count}`;
    // }, 1000);

    // // Solution 3 : liaison explicite avec bind()
    // setTimeout(function() {
    //   this.count++;
    //   return `Compteur : ${this.count}`;
    // }.bind(this), 1000);
  }
}