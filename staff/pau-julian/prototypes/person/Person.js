function Person(name, age, weight, energy, hunger) {
    this.name = name
    this.age = age
    this.weight = weight
    this.energy = energy === undefined ? 50 : energy
    this.hunger = hunger === undefined ? 10 : hunger
    this.thirst = thirst === undefined ? 10 : thirst
    this.moving = false
    this.alive = true
    this.awake = true
}

Person.prototype.eat = function (food) {
    if (this.awake && !this.moving) {
        this.energy += food.energy
        this.thirst -= food.energy * 0.2
        this.weight += food.fat
    } else {
        throw new Error('You are either sleep or moving')
    }
}

Person.prototype.move = function (speed) {
    if (awake) {
        speed === undefined ? stop : speed
        if (speed === walk) {
            this.energy -= 10
            this.thirst -= 10
            this.hunger -= 5
            this.weight -= .2
            this.moving = true
        } else if (speed === run) {
            this.energy -= 20
            this.thirst -= 20
            this.hunger -= 10
            this.weight -= .4
            this.moving = true
        } else if (speed === stop) {
            this.moving = false
        } else {
            throw new TypeError(speed + ' is not a suitable argument')
        }
    }
}

Person.prototype.awake = function (awake) {
    if (awake === awake || awake === undefined) {
        this.awake = true
    } else if (awake === sleep) {
        this.awake = false
    } else {
        throw new TypeError(awake + ' is not awake or sleep')
    }
}

Person.prototype.checkLife = function () {
    if (this.energy < 1 && this.hunger < 1 && this.thirst < 1) {
        this.alive = false
    }
}

if (this.energy < 1 || this.hunger < 1 || this.thirst < 1) {
    this.checkLife()
}

if (!this.alive) {
    delete Person
}




module.exports = Person