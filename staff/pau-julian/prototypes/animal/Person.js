var Animal = require('./Animal')


function Person(name, birthdate, country, height, weight) {
    Animal.call(this, name, race = 'human', birthdate, country, height, weight)
    this.speaking = ''
}
Person.prototype = Object.create(Animal.prototype)
Person.prototype.constructor = Person

Person.NOT_WALK = 0
Person.WALK_SLOW = 1
Person.WALK_NORMAL = 4
Person.RUN = 8

Person.prototype.talk = function () {
    this.legsSpeed = Person.NOT_WALK
    this.speaking = 'blablabla'
}

Person.prototype.shutup = function () {
    this.speaking = ''
}


module.exports = Person