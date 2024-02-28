var assert = require('./assert')
var Cat = require('./Cat')


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


console.log('CASE Sleep')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.sleep()

assert.equalsValue(cat.awake, false)

console.log('CASE Awake')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.wakeup()

assert.equalsValue(cat.awake, true)

console.log('CASE eat')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.eat('banana')

assert.equalsValue(cat.eating, 'banana')

console.log('CASE eat while sleeping (unhappy)')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.sleep()

var errorThrown

try {
    cat.eat('banana')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'try to eat while sleeping')

console.log('CASE walk')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.moveLegs()

assert.equalsValue(cat.legsSpeed, Cat.WALK_NORMAL)

console.log('CASE run')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.moveLegs(Cat.RUN)

assert.equalsValue(cat.legsSpeed, Cat.RUN)

console.log('CASE walk slow')

var cat = new Cat('Trolito', 'Manul', 'Estel', new Date(2000, 5, 15), 'FR', 20, 13)

cat.moveLegs(Cat.WALK_SLOW)

assert.equalsValue(cat.legsSpeed, Cat.WALK_SLOW)

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

/*
console.log('CASE throw glass')

var glass = 'glass';

cat.jump('table')
cat.throwGlass()

assert.equalsValue(glass, undefined)
*/


