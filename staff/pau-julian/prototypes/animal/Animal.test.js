var assert = require('./assert')
var Animal = require('./Animal')

console.log('TEST animal')

console.log('CASE constructor')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

assert.equalsValue(animal.name, 'Sultan')
assert.equalsValue(animal.race, 'Dog')
assert.instanceOf(animal.birthdate, Date)
assert.equalsValue(animal.birthdate.getFullYear(), 2000)
assert.equalsValue(animal.birthdate.getMonth(), 5)
assert.equalsValue(animal.birthdate.getDate(), 15)
assert.equalsValue(animal.country, 'ES')
assert.equalsValue(animal.height, 50)
assert.equalsValue(animal.weight, 25)
assert.equalsValue(animal.awake, true)
assert.equalsValue(animal.eating, '')
assert.equalsValue(animal.legsSpeed, Animal.NOT_WALK)

console.log('CASE constructors UNHAPPY')

var errorThrown

try {
    new Animal(null, 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a string')

var errorThrown

try {
    new Animal('Sultan', null, new Date(2000, 5, 15), 'ES', 50, 25)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a string')

var errorThrown

try {
    new Animal('Sultan', 'Dog', null, 'ES', 50, 25)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a Date')

var errorThrown

try {
    new Animal('Sultan', 'Dog', new Date(2000, 5, 15), null, 50, 25)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a string')

var errorThrown

try {
    new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', '50', 25)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', '50 is not a number')

var errorThrown

try {
    new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, '25')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', '25 is not a number')


console.log('CASE Sleep')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.sleep()

assert.equalsValue(animal.awake, false)

console.log('CASE Awake')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.wakeup()

assert.equalsValue(animal.awake, true)

console.log('CASE eat')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.eat('banana')

assert.equalsValue(animal.eating, 'banana')

console.log('CASE eat while sleeping (unhappy)')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.sleep()

var errorThrown

try {
    animal.eat('banana')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'try to eat while sleeping')

console.log('CASE walk')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.moveLegs()

assert.equalsValue(animal.legsSpeed, Animal.WALK_NORMAL)

console.log('CASE run')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.moveLegs(Animal.RUN)

assert.equalsValue(animal.legsSpeed, Animal.RUN)

console.log('CASE walk slow')

var animal = new Animal('Sultan', 'Dog', new Date(2000, 5, 15), 'ES', 50, 25)

animal.moveLegs(Animal.WALK_SLOW)

assert.equalsValue(animal.legsSpeed, Animal.WALK_SLOW)
