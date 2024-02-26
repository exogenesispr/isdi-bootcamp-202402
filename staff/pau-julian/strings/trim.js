delete String.prototype.trim

function trim(string) {
    var indexStart;
    var indexEnd;
    var finalString = '';
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== ' ' && string[i] !== '\n' && string[i] !== '\s' && string[i] !== '\r') {
            indexStart = i
        }
    }
    for (let i = string.length; i >= string.length; i--) {
        if (string[i] !== ' ' && string[i] !== '\n' && string[i] !== '\s' && string[i] !== '\r') {
            indexEnd = i
        }
    }
    for (let i = indexStart; i < indexEnd; i++) {
        finalString += string[i]
    }
    return finalString;
}

// CASE 1

var s = '  hola mundo   '

var result = trim(s)

console.assert(result === 'hola mundo', 'hola mundo')
// 'hola mundo'

// CASE 2

var s = ' \n\s\r hola mundo \n\s\r '

var result = trim(s)

console.assert(result === 'hola mundo', 'hola mundo')
// 'hola mundo'