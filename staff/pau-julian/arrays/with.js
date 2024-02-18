delete Array.prototype.with

function withFn(array, index, value) {
    var returnedArray = []
    index > -1 ? index : index + array.length
    for (var i = 0; i < array.length; i++) {
        if (i === index) {
            returnedArray[index] = value
        } else {
            returnedArray[i] = array[i]
        }
    }
    return returnedArray
}

console.log('case1')

var nums = [1, 2, 3, 4, 5]
result = withFn(nums, 2, 6)
console.log(result)
console.log('it should return [1, 2, 6, 4, 5]')

var numsUndefined = [1, 2, 3, , 5]

result1 = withFn(numsUndefined, 2, 6)
console.log(result1)
console.log('it should return [1, 2, 6, undefined, 5]')

result2 = withFn(numsUndefined, -3, 6)
console.log(result2)
console.log('it should return [1, 2, 6, undefined, 5]')
