var assert = require('./assert')
var Cat = require('./Cat')
var Person = require('./Person')

console.log('TEST cat')

console.log('CASE constructor')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

assert.equalsValue(cat.name, 'Trolito')
assert.equalsValue(cat.race, 'Manul')
assert.equalsValue(cat.handler, 'Estel')
assert.equalsValue(cat.birthdate.getFullYear(), 2000)
assert.equalsValue(cat.birthdate.getMonth(), 5)
assert.equalsValue(cat.birthdate.getDate(), 15)
assert.equalsValue(cat.country, 'FR')
assert.equalsValue(cat.height, 20)
assert.equalsValue(cat.weight, 13)
assert.equalsValue(cat.awake, true)
assert.equalsValue(cat.eating, '')
assert.equalsValue(cat.legsSpeed, Cat.NOT_WALK)

console.log('CASE handler not a string')
var errorThrown

try {
    new Cat('Trolito', 'Manul', null, new Date(2000, 5, 15), 'FR', 20, 13)
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'TypeError', 'null is not a string')

console.log('CASE jump')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.jump('shelf')

assert.equalsValue(cat.location, 'shelf')

console.log('CASE jump (unhappy)')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

var errorThrown;

try {
    cat.jump(null)
} catch (error) {
    errorThrown = error
}

assert.error(errorThrown, 'TypeError', null + ' is not a suitable location to jump')


