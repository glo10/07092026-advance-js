"use strict";

var myMath = require('./modules/my-math');
console.log('add', myMath.add(2, 4));
console.log('multiply', myMath.multiply(2, 4));
console.log('minus', myMath.minus(2, 4));
try {
  console.log('divide', divide(10, 2));
} catch (error) {
  console.error('Error divide', error);
}