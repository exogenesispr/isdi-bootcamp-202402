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

console.log(char)
// 'u'

// CASE 2

var s = 'hola mundo'

var char = at(s, 20)
console.log(char)
// undefined

// CASE 3

var s = 'hola mundo'

var char = at(s, -5)
console.log(char)
// 'u'