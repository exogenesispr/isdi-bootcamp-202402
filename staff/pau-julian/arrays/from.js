delete array.from

function from(string, mapFn) {
    debugger
    var finalArray = [];
    var pushedStr = '';
    if (mapFn === undefined) {
        for (let i = 0; i < string.length; i++) {
            pushedStr = string[i]
            finalArray[i] = pushedStr
            pushedStr = '';
        }
    } else {
        for (let i = 0; i < string.length; i++) {
            pushedStr = mapFn(string[i])
            finalArray[i] = pushedStr
            pushedStr = '';
        }
    }
    return finalArray
}

//CASE 1

var x = 'h ey wor l d'
result = from(x)
console.log(result)