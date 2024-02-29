function Animal(name, race, birthdate, country, height, weight) {
    if (typeof name !== 'string') { throw new TypeError(name + ' is not a string') }
    if (typeof race !== 'string') { throw new TypeError(race + ' is not a string') }
    if (!(birthdate instanceof Date)) { throw new TypeError(birthdate + ' is not a Date') }
    if (typeof country !== 'string') { throw new TypeError(country + ' is not a string') }
    if (typeof height !== 'number') { throw new TypeError(height + ' is not a number') }
    if (typeof weight !== 'number') { throw new TypeError(weight + ' is not a number') }

    this.name = name
    this.race = race
    this.birthdate = birthdate
    this.country = country
    this.height = height
    this.weight = weight
    this.awake = true
    this.eating = ''
    this.legsSpeed = Animal.NOT_WALK
}

Animal.NOT_WALK = 0
Animal.WALK_SLOW = 4
Animal.WALK_NORMAL = 8
Animal.RUN = 16

Animal.prototype.sleep = function () {
    this.awake = false
}

Animal.prototype.wakeup = function () {
    this.awake = true
}

Animal.prototype.eat = function (food) {
    if (!this.awake) {
        throw new Error('try to eat while sleeping')
    }
    this.eating = food
}

Animal.prototype.moveLegs = function (speed) {
    this.legsSpeed = speed === undefined ? 4 : speed
}

Animal.prototype.talk = function () {
    this.talking = true
}

module.exports = Animal