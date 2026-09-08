function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function minus(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b != 0) return a / b;
  throw new Error("divide by 0 imposible");
}

module.export = {
  add,
  multiply,
  minus,
  divide,
};
