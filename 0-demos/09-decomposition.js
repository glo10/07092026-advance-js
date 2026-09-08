
// Décomposition
const car = { color: 'red', brand: 'Peugeot', model: 3008 }
const { model } = car // idem que const model = car.model
const items =   ['clavier', 'souris', 'écran']
const [clavier, ...autresPeripheriquesTab] = items