var Animal = require('./Animal')

function Dog(name, race, handler, birthdate, country, height, weight, skincolor, allergy) {
    if (typeof handler !== 'string') { throw new TypeError(handler + ' is not a string') }
    Animal.call(this, name, race, birthdate, country, height, weight)
    this.handler = handler
    this.skincolor = skincolor
    this.location = 'ground'
    this.swimming = false
    this.allergies = ['banana', 'chocolate', 'cherry']
    this.allergies.push(allergy)
}

Dog.NOT_WALK = 0
Dog.WALK_SLOW = 4
Dog.WALK_NORMAL = 8
Dog.RUN = 16

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.eat = function (food) {
    if (this.awake === false) {
        throw new TypeError('try to eat while sleeping')
    }
    if (typeof food !== 'string') {
        throw new TypeError(food + ' its not food')
    }
    for (var i = 0; i < this.allergies.length; i++) {
        if (food === this.allergies[i]) {
            throw new Error(this.name + ' is allergic to ' + food)
        }
    }
    this.eating = food
}

Dog.prototype.uneat = function () {
    this.eating = ''
}

Dog.prototype.swim = function () {
    this.swimming = true
    this.location = 'water'
}

Dog.prototype.land = function () {
    this.swimming = false
    this.location = 'ground'
}

module.exports = Dog