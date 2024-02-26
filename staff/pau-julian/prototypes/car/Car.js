function Car(brand, model, year, color, doors, fuelType, transmission, gears) {
    this.brand = brand
    this.model = model
    this.status = 'off'
    this.deposit = 0
    this.year = year
    this.color = color
    this.doors = doors
    this.fuelType = fuelType
    this.transmission = transmission
    this.gears = gears
    this.gear = 0
    this.speed = 0
    this.acceleration = 0
    this.direction = ''
    this.leftright = ''
    this.frontback = ''
    this.steering = 0
}

Car.prototype.fuel = function (load) {
    if (typeof load !== 'number') {
        throw new TypeError(load + ' is not a %')
    }
    if (load < 0 || load > 100) {
        throw new RangeError(load + ' is not a %')
    }
    this.deposit = load
}

Car.prototype.start = function () {
    this.status = 'on'
}

Car.prototype.stop = function () {
    this.status = 'off'
}

Car.prototype.changeGear = function (gear) {
    if (gear < -1 || gear > this.gears) {
        throw new RangeError(gear + ' is not between -1 and' + gears)
    }
    if (gear === -1) {
        this.gear = -1
        this.frontback = 'backward'
    } else {
        this.gear = gear
        this.frontback = 'forward'
    }
}

Car.prototype.speedUp = function (acceleration) {
    if (this.status === 'on') {
        this.changeGear(this.gear)
        if (acceleration < 0) {
            throw new RangeError(acceleration + ' cannot be negative')
        }
        if (acceleration > 160) {
            throw new RangeError('bro you are not a BMW go below 160')
        }
        this.acceleration = acceleration
        this.direction = this.frontback + this.leftright
    }
}

Car.prototype.changeSteering = function (degrees) {
    if (this.status === 'on') {
        this.changeGear(this.gear)
        if (degrees < -721) {
            throw new RangeError('You cannot go further left')
        }
        if (degrees > 721) {
            throw new RangeError('You cannot go further right')
        }
        if (degrees > 0) {
            this.steering = degrees
            this.leftright = '-right'
        }
        if (degrees < 0) {
            this.steering = degrees
            this.leftright = '-left'
        }
        if (degrees === 0) {
            this.steering = degrees
            this.leftright = ''
        }
        this.direction = this.frontback + this.leftright
    }
}

module.exports = Car