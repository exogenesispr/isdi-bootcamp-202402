delete Array.prototype.slice

function slice(array, start, end) {
    var sliced = []
    if (arguments.length === 2) {
        if (start > -1) {
            for (var i = start; i < array.length; i++) {
                sliced[sliced.length] = array[i]
            }
        } else {
            for (var i = start + array.length; i < array.length; i++) {
                sliced[sliced.length] = array[i]
            }
        }
    } else if (end > -1) {
        if (start > -1) {
            for (var i = start; i < end; i++) {
                sliced[sliced.length] = array[i]
            }
        } else {
            for (var i = start + array.length; i < end; i++) {
                sliced[sliced.length] = array[i]
            }
        }
    } else if (end < 0) {
        if (start > -1) {
            for (var i = start; i < end + array.length; i++) {
                sliced[sliced.length] = array[i]
            }
        } else {
            for (var i = start + array.length; i < end + array.length; i++) {
                sliced[sliced.length] = array[i]
            }
        }
    }
    return sliced
}

console.log('cases 1-4, they should return [3,4,5,6,7]')
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
result = slice(a, 2, 7)
console.log(result)

result1 = slice(a, -7, 7)
console.log(result1)

result2 = slice(a, 2, -2)
console.log(result2)

result3 = slice(a, -7, -2)
console.log(result3)

console.log('this last 2 should return [8,9]')
result4 = slice(a, 7)
console.log(result4)

result5 = slice(a, -2)
console.log(result5)