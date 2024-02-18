delete Array.prototype.shift

function shift(array) {
    var shifted = '';
    if (array.length === 0) {
        return undefined
    }
    if (array.length === 1) {
        shifted = array[0]
        delete array[0]
        return shifted
    }
    if (array.length > 1) {
        shifted = array[0]
        for (var i = 1; i < array.length; i++) {

            delete array[i - 1]
            array[i - 1] = array[i]
        }
        array.length = array.length - 1
        return shifted


    }
}

console.log('case1')
var a = ['a']
result = shift(a)
console.log(result)


console.log('case2')
var abc = ['a', 'b', 'c']
result1 = shift(abc)
console.log(result1)
console.log(abc)

console.log('case3')
var emptythings = []
result2 = shift(emptythings)
