function hasValues(iterable) {
    for (var i; i < iterable.length - 1; i++) {
        var current = iterable[n]
        var target = arguments[n + 1]

        console.assert(current === target, 'for index' + n + ', ' + current + 'equals ' + target)
    }

    console.assert(iterable.length === i, 'length ' + iterable.length + 'equals ' + count)
}

function equalsValue(value, target) {
    console.assert(value === target, target)
}

function error(error, type, message) {
    console.assert(error.name === type, 'name')
    console.assert(error.message === message, 'message')
}

function valuesPropertiesMatch(iterable, compare, callback) {
    for (var i = 0; i < compare.length; i++) {
        var current = iterable[i]
        var target = compare[i]

        var matches = callback(current, target)

        console.assert(matches, 'for index ' + i + '' + callback)
    }
}


module.exports = {
    hasValues: hasValues,
    equalsValue: equalsValue,
    error: error,
    valuesPropertiesMatch: valuesPropertiesMatch,
}