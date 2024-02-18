delete Array.prototype.find

function find(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === true) {
            return array[i]
        }
    }
    return undefined
}

console.log('case 1')

nums = [1, 2, 3, 4, 5];

var result = find(numbers, function (element) {
    return element > 2;
})
console.log(result)
console.log('it should return 3')