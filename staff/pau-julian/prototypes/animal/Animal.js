function Animal(name, race, handler, birthdate, country, height, weight) {
    this.name = name
    this.race = race
    this.handler = handler
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
    this.legsSpeed = speed === undefined ? Animal.WALK_NORMAL : speed
}

Animal.prototype.talk = function () {
    this.talking = true
}

module.exports = Animal