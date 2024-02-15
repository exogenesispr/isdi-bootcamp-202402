delete String.prototype.lastIndexOf

function lastIndexOf(string, searchString) {
    debugger
    var returnString = '';
    for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] === searchString[0]) {
            for (let j = 0; j < searchString.length; j++) {
                returnString = returnString + string[i + j]
            }
            if (returnString === searchString) {
                return i
            } else {
                returnString = '';
            }
        }
    }
    return -1
}

// CASE 1

var s = 'hola mundo'

var index = lastIndexOf(s, 'o')

console.log(index)
// 9

// CASE 2

var s = 'hola mundo'

var index = lastIndexOf(s, 'ol')

console.log(index)
// 1