delete String.prototype.at

function at(string, index) {
    // TODO implement me
    var result = '';
    if (index >= 0) {
        result = string[index]
    } else {
        result = string[string.length + index]
    }
    return result;
}

// CASE 1

var s = 'hola mundo'

var char = at(s, 6)
console.assert(char === 'u', 'u')
// 'u'

// CASE 2

var s = 'hola mundo'

var char = at(s, 20)
console.assert(char === undefined, undefined)
// undefined

// CASE 3

var s = 'hola mundo'

var char = at(s, -4)
console.assert(char === 'u', 'u')
// 'u'