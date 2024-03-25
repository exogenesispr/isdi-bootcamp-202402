/**
 * Inserts an element in iterable object at specfified index.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to insert the given values.
 * @param value - The values to insert.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function insertMany(object, index, value) {
    if (object instanceof Object) {
        if (typeof index === 'number') {
            if (arguments.length === 3) {
                for (var i = object.length - 1; i > index - 1; i--) {
                    object[i + 1] = object[i]
                }
                object[index] = value
                object.length++
                return object.length
            } else if (arguments.length > 3) {
                for (var i = object.length - 1; i > index - 1; i--) {
                    object[i + (arguments.length - 2)] = object[i]
                }
                for (var i = 2; i < arguments.length; i++) {
                    object[index + i - 2] = arguments[i]
                }
                object.length += arguments.length - 2
                return object.length
            }
        } else { throw TypeError(index + ' is not a number') }
    } else { throw TypeError(object + ' is not an object') }
}

console.log('CASE 1: insert skyblue in index 1')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 1, 'skyblue')

console.log(length)
// 4

console.log(colors)
/*
{
    0: 'red',
    1: 'skyblue',
    2: 'blue',
    3: 'green',
    length: 4
}
*/

console.log('CASE 2: insert skyblue, gold and plum in index 2')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 2, 'skyblue', 'gold', 'plum')

console.log(length)
// 6

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'skyblue',
    3: 'gold',
    4: 'plum',
    5: 'green',
    length: 6
}
*/

console.log('CASE 3: fails on undefined object parameter')

try {
    insertMany()
} catch (error) {
    console.log(error)
    // TypeError: undefined is not an Object
}

console.log('CASE 4: fails on 1 as an object parameter')

try {
    insertMany(1)
} catch (error) {
    console.log(error)
    // TypeError: 1 is not an Object
}

console.log('CASE 5: fails on undefined as index parameter')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

try {
    insertMany(colors)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a umber
}