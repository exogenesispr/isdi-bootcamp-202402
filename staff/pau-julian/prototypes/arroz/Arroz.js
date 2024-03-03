function Arroz() {
    if (arguments.length !== 1) {
        this.length = arguments.length

        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i]

            this[i] = argument
        }
    } else {
        var argument = arguments[0]

        if (typeof argument === 'number') {
            this.length = argument

            return
        }

        this[0] = argument
        this.length = 1
    }
}

Arroz.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length] = argument
        this.length++
    }
    return this.length
}

Arroz.prototype.pop = function () {
    var lastIndex = this.length - 1
    var last = this[lastIndex]

    delete this[lastIndex]

    this.length--

    return last
}

Arroz.prototype.toString = function () {
    var string = 'Arroz ['

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        string += element

        if (i < this.length - 1) {
            string += ', '
        }
    }

    string += ']'

    return string
}

Arroz.prototype.at = function (index) {
    return this[index > -1 ? index : index + this.length]
}

Arroz.prototype.concat = function (added) {
    if (added instanceof Array) {
        for (var i = 0; i < added.length; i++) {
            this[this.length] = added[i]
            this.length++
        }
    }
    this[this.length] = added
    this.length++

    return this
}

Arroz.prototype.every = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (element !== undefined) {
            if (callback(element) === false)
                return false
        }
    }
    return true
}

Arroz.prototype.includes = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (element !== undefined) {
            if (callback(element) === true)
                return true
        }
    }
    return false
}

Arroz.prototype.indexOf = function (value, index) {
    if (arguments.length === 1) {
        for (var i = 0; i < this.length; i++) {
            element = this[i]
            if (element === value) {
                return i
            }
        }
    } else if (arguments.length === 2) {
        index = index > -1 ? index : index + this.length - 1
        if (index < 0 || index > this.length) {
            return -1
        }
        for (var i = index; i < this.length; i++) {
            element = this[i]
            if (element === value) {
                return i
            }
        }
    }
}

Arroz.prototype.lastIndexOf = function (value, index) {
    if (arguments.length === 1) {
        for (var i = this.length - 1; i > -1; i--) {
            element = this[i]
            if (value === element) {
                return i
            }
        }
    } else if (arguments.length === 2) {
        index = index > -1 ? index : index + this.length
        for (var i = index; i > -1; i--) {
            element = this[i]
            if (value === element) {
                return i
            }
        }
    }
    return -1
}

Arroz.prototype.some = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(i)) {
            return true
        }
    }
    return false
}

Arroz.prototype.shift = function () {
    returnedElement = this[0]
    for (var i = 0; i < this.length; i++) {
        this[i] = this[i + 1]
    }
    delete this[this.length - 1]
    this.length--
    return returnedElement
}

Arroz.prototype.unshift = function () {
    var elements = arguments.length
    for (var i = this.length - 1; i > -1; i--) {
        this[i + elements] = this[i]
    }
    for (var i = 0; i < elements; i++) {
        this[i] = arguments[i]
    }
}

Arroz.prototype.map = function (callback) {
    var mappedArroz = new Arroz()
    for (var i = 0; i < this.length; i++) {
        mappedArroz[i] = callback(this[i], i, this)
    }
    return mappedArroz
}

Arroz.prototype.join = function (separator) {
    var returnedString = ''
    separator = arguments.length < 1 ? ',' : separator

    for (var i = 0; i < this.length; i++) {
        if (i === this.length - 1) {
            returnedString += this[i]
            return returnedString

        }
        returnedString += this[i] + separator
    }
}

Arroz.prototype.with = function (index, value) {
    if (index > this.length - 1 || index < -this.length) {
        throw new RangeError('index not in bounds')
    }
    index = index > -1 ? index : this.length + index
    var returnedArroz = new Arroz()
    for (var i = 0; i < this.length; i++) {
        if (i === index) {
            returnedArroz[i] = value
        } else {
            returnedArroz[i] = this[i]
        }
    }
    return returnedArroz
}

Arroz.prototype.find = function (callback) {
    for (var i = 0; i < this.length; i++) {
        element = this[i]
        if (callback(element)) {
            return element
        }
    }
    return undefined
}

Arroz.prototype.findIndex = function (callback) {
    for (var i = 0; i < this.length; i++) {
        element = this[i]
        if (callback(element)) {
            return i
        }
    }
    return undefined
}

Arroz.prototype.filter = function (callback) {
    var returnedArroz = new Arroz()
    for (var i = 0; i < this.length; i++) {
        element = this[i]
        if (callback(element)) {
            returnedArroz[returnedArroz.length] = element
            returnedArroz.length++
        }
    }
    return returnedArroz
}

Arroz.prototype.reduce = function (callback, accumulator) {
    if (arguments.length === 1) {
        accumulator = this[0]
        for (var i = 1; i < this.length; i++) {
            var element = this[i]
            accumulator = callback(accumulator, element)
        }
    } else if (arguments.length === 2) {
        for (var i = 0; i < this.length; i++) {
            var element = this[i]
            accumulator = callback(accumulator, element)
        }
    }
    return accumulator
}

Arroz.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        callback(element, i)
    }
}

Arroz.prototype.slice = function (start, end) {
    if (arguments.length === 0) {
        this.toString
    }
    start = !!start ? start > -1 ? start : start + this.length : 0
    end = !!end ? end > -1 ? end : end + this.length : this.length - 1
    if (start > end) {
        throw new RangeError('input index not correct')
    }
    var returnedArroz = new Arroz()
    for (var i = start; i < end; i++) {
        returnedArroz[returnedArroz.length] = this[i]
        returnedArroz.length++
    }
    return returnedArroz
}

Arroz.prototype.splice = function (start, deleteCount, item) {
    start = start > -1 ? start : start + this.length
    deleteCount = !!deleteCount ? deleteCount : 0
    if (arguments.length === 2) {
        //TO DO
    }
}

module.exports = Arroz