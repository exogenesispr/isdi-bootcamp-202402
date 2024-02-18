delete Array.prototype.filter

function filter(array, callback) {
    var returnedArray = []
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === true) {
            returnedArray[returnedArray.length] = array[i]
        }
    }
    return returnedArray
}

console.log('case1')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

result = filter(words, function (x) {
    return x.length > 6;
})

console.log(result)
console.log('it should return ["exuberant", "destruction", "present"]')

console.log('case2')

var numbers = [1, 2, 3, 4, 5, 6];
var result2 = filter(numbers, function (num) {
    return num % 2 === 0;
})

console.log(result2)
console.log('it should log [2,4,6]')

console.log('case3')

var numbers = [1, 2, 3, undefined, 5, 6];
var result3 = filter(numbers, function (num) {
    return num % 2 === 0;
})

console.log(result3)
console.log('it should log [2,6]')