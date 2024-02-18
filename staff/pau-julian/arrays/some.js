delete Array.prototype.some

function some(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === true) {
            return true
        }
    }
    return false
}

const nums = [1, 2, 3, 4, 5];
result = some(nums, function (x) {
    return x % 2 === 0;
})
console.log(result)

result1 = some(nums, function (x) {
    return x % 7 === 0;
})
console.log(result1)