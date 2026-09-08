
//@see source https://dasha.ai/blog/javascript-scope-and-scope-chain
// Global variable
const userName = "Peter";
let working = false;
// Outer function
function calcAge(birthyear) {
  const currentYear = 2021;
  const age = currentYear - birthyear;
   // inner block
  if (age <= 60) {
    let working = true;
    // var working = true;
    console.log('working bloc if', working)
    const message = `Peter is still employed!`;
    console.log(message);
  }
  // inner function
  function yearsToRetire() {
    const retirement = 60 - age;
    console.log(`${userName} will be retired in ${retirement} years!`);
  }
  yearsToRetire();
  console.log('working scope fonction calcAge', working);
}
console.log('working bloc global', working)
calcAge(1975); 
