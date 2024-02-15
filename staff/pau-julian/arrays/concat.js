delete Array.prototype.concat

function concat(...values) {
    debugger
    var finalArray = [];
    for (let value = 0; value < values.length; value++) {
        if (value instanceof Array) {
            for (let i = 0; i < values[value].length; i++) {
                finalArray[finalArray.length] = values[value][i]
            }
        } else {
            finalArray[finalArray.length] = values[value]

        }
    }
    return finalArray
}

//CASE 1

var x = ['1', '2', '3']
var y = ['4', '5']
var z = ['7', '8', '888']

result = concat(x, y, z)

console.log(result)

//case2

result2 = concat(y, x)
console.log(result2)


//case3
result3 = concat(z, ['cerdo', 'perro'], x, z)
console.log(result3)