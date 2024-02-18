delete Array.prototype.every

function every(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
            if (callback(array[i], i, array) === false) {
                return false
            }
        }
    }
    return true
}

console.log('case1')
var array1 = [1, 30, 39, 29, 10, 13]

result = every(array1, function (x) {
    return x < 40;
})

console.log(result)
console.log('it should log true')

console.log('case2')
var array1 = [1, 30, 39, undefined, 10, 13]

result2 = every(array1, function (x) {
    return x < 40;
})

console.log(result2)
console.log('it should log true')

console.log('case3')
var array1 = [1, 30, 39, undefined, 10, 43]

result3 = every(array1, function (x) {
    return x < 40;
})

console.log(result3)
console.log('it should log false')