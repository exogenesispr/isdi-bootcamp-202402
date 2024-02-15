delete Array.prototype.push

delete Array.prototype.push

function push(array, addedArray) {
    var finalArray = [];
    var pushedString = '';
    if (addedArray !== array && addedArray !== undefined) {
        array[array.length] = addedArray
        return array.length
    } else if (addedArray == array) {
        for (let i = 0; i < array.length; i++) {
            pushedString = array[i]
            finalArray[i] = pushedString
            pushedString = '';
        }
        for (let j = array.length; j < (array.length + addedArray.length); j++) {
            pushedString = addedArray[j - array.length]
            finalArray[j] = pushedString
            pushedString = '';
        }
    } else if (addedArray == undefined) {
        array[array.length] = undefined
        return array.length
    }

}

// CASE 1

var numes = [100, 200, 300, 400, 500]

var length = push(nums, 600)
console.log(length)
// 6
console.log(nums)
//[100, 200, 300, 400, 500, 600]

//CASE 2

var animals = ['pigs', 'goats', 'sheep']

var length = push(animals, 'cows')

console.log(length)
//4
console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']

//CASE 3

var sport = ['soccer', 'baseball']

var length = push(sports)

console.log(length)
// 2
console.log(sports)
['soccer', 'baseball']

// CASE 4

var sports = ['soccer', 'baseball']
var length = push(sports, undefined)
console.log(length)
//3
console.logg(sports)
//['soccer', 'baseball', undefined]