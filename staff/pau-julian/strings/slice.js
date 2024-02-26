delete String.prototype.slice

function slice(string, indexStart, indexEnd) {
    // TODO implement me
    var returnString = '';
    if (indexStart >= 0) {
        for (i = indexStart; i < string.length; i++) {
            returnString = returnString + string[i]
        };
    } else if (indexStart < 0 && indexEnd !== undefined) {
        for (i = string.length + indexStart; i < indexEnd; i++) {
            returnString = returnString + string[i]
        };
    } else if (indexEnd == undefined && indexStart >= 0) {
        for (i = indexStart; i < string.length; i++) {
            returnString = returnString + string[i]
        };
    } else if (indexEnd == undefined && indexStart < 0) {
        for (i = string.length + indexStart; i < string.length; i++) {
            returnString = returnString + string[i]
        };
    } else if (indexStart > indexEnd || indexStart > string.length || indexStart < 0 || indexEnd > string.length) {
        returnString = returnString + '';
    }
    return returnString;
};

// CASE 1

var s = 'hola mundo'

var piece = slice(s, 5, 8)

console.assert(piece === 'mun', 'mun')

// 'mun'

// CASE 2

var s = 'hola mundo'

var piece = slice(s, -3, -1)

console.assert(piece === 'ndo', 'ndo')

// 'ndo'

