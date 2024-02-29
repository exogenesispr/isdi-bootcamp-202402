var assert = require('./assert')
var Dog = require('./Dog')

console.log('TEST Dog')

console.log('CASE constructor')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

assert.equalsValue(dog.name, 'Maquina')
assert.equalsValue(dog.race, 'Salchicha')
assert.equalsValue(dog.handler, 'Pau')
assert.equalsValue(dog.birthdate.getFullYear(), 2000)
assert.equalsValue(dog.birthdate.getMonth(), 5)
assert.equalsValue(dog.birthdate.getDate(), 15)
assert.equalsValue(dog.country, 'ES')
assert.equalsValue(dog.height, 10)
assert.equalsValue(dog.weight, 7)
assert.equalsValue(dog.awake, true)
assert.equalsValue(dog.eating, '')
assert.equalsValue(dog.legsSpeed, Dog.NOT_WALK)
assert.equalsValue(dog.skincolor, 'brown')
assert.equalsValue(dog.location, 'ground')
assert.equalsValue(dog.swimming, false)
assert.hasValues(dog.allergies, 'banana', 'chocolate', 'cherry', 'human flesh')

console.log('CASE handler not a string')

var errorThrown

try {
    new Dog('Maquina', 'Salchicha', null, new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a string')

console.log('CASE swim')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

dog.swim()

assert.equalsValue(dog.swimming, true)
assert.equalsValue(dog.location, 'water')

dog.land()

assert.equalsValue(dog.swimming, false)
assert.equalsValue(dog.location, 'ground')

console.log('CASE eat')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

dog.eat('chicken')

assert.equalsValue(dog.eating, 'chicken')

console.log('CASE uneat')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

dog.eat('chicken')
dog.uneat()

assert.equalsValue(dog.eating, '')

console.log('CASE eat while sleeping (unhappy)')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

dog.sleep()

var errorThrown

try {
    dog.eat('chicken')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'try to eat while sleeping')

console.log('CASE eat allergy 1 (unhappy)')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

var errorThrown

try {
    dog.eat('banana')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'Maquina is allergic to banana')

console.log('CASE eat allergy 2 (unhappy)')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

var errorThrown

try {
    dog.eat('chocolate')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'Maquina is allergic to chocolate')

console.log('CASE eat allergy 3 (unhappy)')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

var errorThrown

try {
    dog.eat('cherry')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'Maquina is allergic to cherry')

console.log('CASE eat allergy pushed (unhappy)')

var dog = new Dog('Maquina', 'Salchicha', 'Pau', new Date(2000, 5, 15), 'ES', 10, 7, 'brown', 'human flesh')

var errorThrown

try {
    dog.eat('human flesh')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'Maquina is allergic to human flesh')