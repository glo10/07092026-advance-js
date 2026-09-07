
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("avec var", i), 100);
}
 
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("avec let", i), 100);
}