delete Array.prototype.indexOf

function indexOf(array, value) {
    debugger
    if (typeof value === 'number' && value >= 0 && value <= array.length) {
        for (let i = 0; i < array.length; i++) {
            if (i === value) {
                return array[i]
            }
        }
    } else if (typeof value === 'number' && value < 0 && value > -(array.length)) {
        for (let i = (array.length - 1); i >= 0; i--) {
            if (i === (array.length + value)) {
                return array[i]
            }
        }
    } else if (typeof value !== 'number') {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
    }
}

// case 1

var x = ['hol', 'aqu', 'et', 'al', 'estas']
result = indexOf(x, 'al')
console.log(result)

//case 2

var y = ['hol', 'aqu', 6, 'al', undefined, [6, 'liadon']]

result2 = indexOf(y, 2)
console.log(result2)

// case 3 
result3 = indexOf(y, 4)
console.log(result3)

//case 4
result4 = indexOf(y, -1)
console.log(result4)

//case 5
result5 = indexOf(x, -8)
console.log(result5)