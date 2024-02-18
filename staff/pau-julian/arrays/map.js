delete Array.prototype.map

function map(array, callback) {
    var returnedArray = []
    for (var i = 0; i < array.length; i++) {
        returnedArray[returnedArray.length] = callback(array[i], i, array)
    }
    return returnedArray
}

console.log('case1')

var nums = [1, 5, 10, 15]

result = map(nums, function (x) {
    return x * 2;
})
console.log(result)
console.log('it should log [2,10,20,30] and former array stay the same')

console.log('case2')

var nums = [1, 4, 9, 16]

result2 = map(nums, function (x) {
    return Math.sqrt(x);
})
console.log(result2)
console.log('it should log [1,2,3,4] and former array stay the same')
