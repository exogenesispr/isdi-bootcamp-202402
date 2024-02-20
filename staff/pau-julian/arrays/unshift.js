delete Array.prototype.unshift

function unshift(array, args) {
    array = arguments[0]
    var elements = []
    for (element = 1; element < arguments.length; element++) {
        if (arguments[element] instanceof Array) {
            for (var j = 0; j < arguments[element].length; j++) {
                elements[elements.length] = arguments[element][j]
            }
        } else {
            elements[elements.length] = arguments[element]
        }
    }
    //TO DO
    array.length = array.length + elements.length
    for (var i = array.length - 1; i > -1; i--) {
        array[i] = array[i - elements.length]
    }
    if (elements.length === 1) {
        array[0] = elements
    } else if (elements.length > 1) {
        for (var i = 0; i < elements.length; i++) {
            array[i] = elements[i]
        }
    }
    return array
}

console.log('case1')

var nums = [1, 2, 3, 4, 5, 6, 7]

result = unshift(nums, [0, 8], 'ioio', true)

console.log(nums)