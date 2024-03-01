function hasValues(iterable) {
    for (var i; i < iterable.length - 1; i++) {
        var current = iterable[i]
        var target = arguments[i + 1]

        console.assert(current === target, 'for index' + i + ', ' + current + ' equals ' + target)
    }

    console.assert(iterable.length === arguments.length - 1, 'length ' + iterable.length + ' equals ' + arguments.length - 1)
}

function equalsValue(value, target) {
    console.assert(value === target, value + ' equals ' + target)
}

function error(error, type, message) {
    console.assert(error.name === type, error.name + ' should be ' + type)
    console.assert(error.message === message, message + ' should be message')
}

function valuesPropertiesMatch(iterable, compare, callback) {
    for (var i = 0; i < compare.length; i++) {
        var current = iterable[i]
        var target = compare[i]

        var matches = callback(current, target)

        console.assert(matches, 'for index ' + i + '' + callback)
    }
}

function instanceOf(value, type) {
    console.assert(value instanceof type === true, value + ' is instance of ' + type)
}


module.exports = {
    hasValues: hasValues,
    equalsValue: equalsValue,
    error: error,
    valuesPropertiesMatch: valuesPropertiesMatch,
    instanceOf: instanceOf
}