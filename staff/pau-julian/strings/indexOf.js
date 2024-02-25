delete String.prototype.indexOf

function indexOf(string, searchString) {
    debugger
    let returnString = ''
    for (let i = 0; i < string.length; i++) {
        if (string[i] === searchString[0]) {
            for (let j = 0; j < searchString.length; j++) {
                returnString = returnString + string[i + j]
            }
            if (searchString === returnString)
                return i
        }
    }
    return -1
}


// CASE 1

var s = 'hola mundo'

var index = indexOf(s, 'ola')

console.assert(index === 1, 1)
// 1

// CASE 2

var s = 'hola mundo'

var index = indexOf(s, 'olaf')

console.assert(index === -1, -1)
// -1