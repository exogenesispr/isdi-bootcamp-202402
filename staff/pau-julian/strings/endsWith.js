delete String.prototype.endsWith

function endsWith(string, searchString) {
    debugger
    var returnString = '';
    var index = (string.length - searchString.length);
    for (let j = 0; j < searchString.length; j++) {
        returnString = returnString + string[(index + j)]
    }
    return returnString == searchString;
}

// CASE 1

var s = 'hola mundo'

var result = endsWith(s, 'ndo')

console.assert(result === true, true)
// true

// CASE 2

var s = 'hola mundo'

var result = endsWith(s, 'dos')

console.assert(result === false, false)
// false