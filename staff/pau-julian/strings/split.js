delete String.prototype.split

function split(string, separator) {
    // TODO implement me
    var answerArray = [];
    var pushedItems = '';
    for (i = 0; i < string.length; i++) {
        if (string[i] !== separator) {
            pushedItems = pushedItems + string[i]
        } else if (string[i] === separator) {
            answerArray[answerArray.length] = pushedItems
            pushedItems = ''
        }
    };

    answerArray[answerArray.length] = pushedItems
    pushedItems = ''

    return answerArray
}


// CASE 1

var s = 'hola mundo'

var words = split(s, ',')
console.log(words)

console.assert(words === 'hola, mundo', 'hola, mundo')
// ['hola', 'mundo']