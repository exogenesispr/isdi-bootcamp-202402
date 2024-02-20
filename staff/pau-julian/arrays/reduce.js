delete Array.prototype.reduce

function reduce(array, callback, initialValue) {
    if (arguments.length === 2) {
        accumulator = array[0]
        for (var i = 1; i < array.length; i++) {
            accumulator = callback(accumulator, array[i], i, array)
        }
    } else {
        accumulator = initialValue
        for (var i = 0; i < array.length; i++) {
            accumulator = callback(accumulator, array[i], i, array)
        }
    }
    return accumulator
}

var cosas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

result = reduce(cosas, function (accum, x) {
    return accum + x
}, 0)

console.log(result)

result1 = reduce(cosas, function (accum, x) {
    return accum + x
}, 5)

console.log(result1)