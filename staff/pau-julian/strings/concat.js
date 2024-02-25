delete String.prototype.concat

function concat(str1, separator, str2) {
    var returnString = '';
    returnString = str1 + separator + str2;
    return returnString;
}

//CASE 1

var a = 'hola'
var b = 'world'

result = concat(a, ', ', b)
console.assert(result = 'hola, world', 'hola, world')

