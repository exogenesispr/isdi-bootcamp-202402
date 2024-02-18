delete array.prototype.lastIndexOf

function lastIndexOf(array, searchElement, fromIndex) {
    if (fromIndex === undefined) {
        for (var i = array.length - 1; i > -1; i--) {
            if (array[i] === searchElement) {
                return i
            }
        }
    } else if (typeof fromIndex === "number") {
        if (fromIndex > -1) {
            for (var i = fromIndex; i > -1; i--) {
                if (array[i] === searchElement) {
                    return i
                }
            }
        } else {
            for (var i = fromIndex + array.length; i > -1; i--) {
                if (array[i] === searchElement) {
                    return i
                }
            }
        }
    }
    return -1
}


console.log('case1')

var nums = [1, 2, 3, 4, 3, 6, 7, 3, 9]

var result = lastIndexOf(nums, 3)

console.log(result)
console.log('it should log 7')

console.log('case2')

var result1 = lastIndexOf(nums, 3, 6)
console.log(result1)
console.log('it should log 4')

console.log('case3')

var result2 = lastIndexOf(nums, 3, -3)
console.log(result2)
console.log('it should log 4')