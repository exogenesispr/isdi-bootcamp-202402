var assert = require('./assert')
var Person = require('./Person')

console.log('TEST person')

console.log('CASE constructor')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

assert.equalsValue(person.name, 'Pau')
assert.equalsValue(person.race, 'human')
assert.equalsValue(person.birthdate.getFullYear(), 2000)
assert.equalsValue(person.birthdate.getMonth(), 5)
assert.equalsValue(person.birthdate.getDate(), 15)
assert.equalsValue(person.country, 'ES')
assert.equalsValue(person.height, 170)
assert.equalsValue(person.weight, 85)
assert.equalsValue(person.awake, true)
assert.equalsValue(person.eating, '')
assert.equalsValue(person.speaking, '')
assert.equalsValue(person.legsSpeed, Person.NOT_WALK)

console.log('CASE Sleep')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.sleep()

assert.equalsValue(person.awake, false)

console.log('CASE Awake')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.wakeup()

assert.equalsValue(person.awake, true)

console.log('CASE eat')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.eat('banana')

assert.equalsValue(person.eating, 'banana')

console.log('CASE eat while sleeping (unhappy)')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.sleep()

var errorThrown

try {
    person.eat('banana')
} catch (error) {
    errorThrown = error
}
assert.error(errorThrown, 'Error', 'try to eat while sleeping')

console.log('CASE walk')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.moveLegs()

assert.equalsValue(person.legsSpeed, Person.WALK_NORMAL)

console.log('CASE run')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.moveLegs(Person.RUN)

assert.equalsValue(person.legsSpeed, Person.RUN)

console.log('CASE walk slow')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.moveLegs(Person.WALK_SLOW)

assert.equalsValue(person.legsSpeed, Person.WALK_SLOW)

console.log('CASE talking')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.talk()

assert.equalsValue(person.speaking, 'blablabla')

console.log('CASE shut up')

var person = new Person('Pau', new Date(2000, 5, 15), 'ES', 170, 85)

person.shutup()

assert.equalsValue(person.speaking, '')