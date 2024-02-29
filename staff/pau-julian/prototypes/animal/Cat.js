var Animal = require('./Animal')

function Cat(name, race, handler, birthdate, country, height, weight, skincolor) {
    Animal.call(this, name, race, handler, birthdate, country, height, weight)
    this.skincolor = skincolor
    this.location = 'floor'
}
Cat.NOT_WALK = 0
Cat.WALK_SLOW = 4
Cat.WALK_NORMAL = 8
Cat.RUN = 16

Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat

Cat.prototype.jump = function (location) {
    if (typeof location !== 'string') { throw new TypeError(location + ' is not a suitable location to jump') }
    this.location = location
}

/*
Cat.prototype.throwGlass = function () {
    if (this.location !== 'table') {
        throw new Error(`There's no glass in this ` + location)
    }
    this.glass = undefined
}
*/
module.exports = Cat
