/**
 * 
 * @param {object} The iterable object to mutate. 
 * @param {value} The index value that you want to extract.
 * 
 * @throws {TypeError} When object is not an object.
 */

function remove(object, index) {
    if (object instanceof Object) {
        var returned;
        for (var i = 0; i < object.length; i++) {
            if (i === index) {
                returned = object[i]
                for (var j = i; j < object.length; j++) {
                    object[j] = object[j + 1]
                }
                object.length--
                delete object[object.length]
            }
        }
        return returned
    } else {
        throw TypeError(object + ' is not an object')
    }
}

console.log('case 1')

var carros = {
    0: 'honda',
    1: 'merce',
    2: 'ferra',
    3: 'bugat',
    length: 4
}

result = remove(carros, 1)
console.log(result)

console.log('case 2')

