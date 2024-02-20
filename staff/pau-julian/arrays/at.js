delete Array.prototype.at
function at(array, index) {
    return array[index > -1 ? index : index + array.length]
}


//CASE 1
var nums = [100, 200, 300, 400, 500]

var num = at(nums, 3)
console.log(num)
//400

// CASE 2

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, 4)

console.log(char)
// ' '

// CASE 3

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -3)

console.log(char)
// 'n'

// CASE 4

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -20)

console.log(char)
// undefined