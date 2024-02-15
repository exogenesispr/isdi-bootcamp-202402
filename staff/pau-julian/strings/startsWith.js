delete String.prototype.startsWith

function startsWith(string, searchString) {
    debugger
    let returnStr = ''
    for (let i = 0; i < searchString.length; i++) {
        returnStr = returnStr + string[i]
    }
    return returnStr == searchString
}



// CASE 1

var s = 'hola mundo'

var result = startsWith(s, 'hol')

console.log(result)
// true

// CASE 2

var s = 'hola mundo'

var result = startsWith(s, 'holo')

console.log(result)
// false