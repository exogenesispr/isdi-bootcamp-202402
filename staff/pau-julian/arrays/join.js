delete Array.prototype.join

function join(array, separator) {

    if (array.length === 0) {
        return ''
    }
    if (array.length === 1) {
        return String(array[0])
    }
    var emptyStr = String(array[0])
    for (var i = 1; i < array.length; i++) {
        emptyStr += separator + String(array[i])
    }
    return emptyStr
}

console.log('case1')
var elements = ['Fire', 'Air', 'Water'];

result = join(elements, ',')
console.log(result)
//ACTUALLY DID NOT GET IT AND MADE IT BY TRIAL AND ERROR