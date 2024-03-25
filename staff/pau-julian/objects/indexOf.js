/**
 * 
 * @param {object} The value of the object you want to iterate
 * @param {value} The value you want to know if exists in the object 
 * @returns The index of the value of your input
 */

function indexOf(object, value) {
    if (object instanceof Object) {
        for (var i = 0; i < object.length; i++) {
            var elem = object[i]

            if (elem === value) {
                return i
            }
        }

        return -1
    } else { throw TypeError(object + ' is not an object') }
}

console.log('CASE 1: index of blue in colors')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var index = indexOf(colors, 'blue')

console.log(index)
// 1

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}
*/

var casa = 'myhome'

try {
    indexOf(casa, 'blue')
} catch (error) {
    console.log(error)
    //TypeError: myhome is not an object
}