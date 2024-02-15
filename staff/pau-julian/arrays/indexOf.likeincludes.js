delete Array.prototype.indexOf

function indexOf(array, searchElement, fromIndex) {
    debugger
    if (fromIndex >= 0 && fromIndex < array.length && fromIndex.length === 1) {
        if (array[fromIndex] === searchElement) {
            return fromIndex
        }
    } else if (fromIndex < 0 && fromIndex > -array.length) {
        if (array[fromIndex + array.length] === searchElement) {
            return fromIndex
        }
    } else if (fromIndex === undefined) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === searchElement) {
                return i
            }
        }
    } else if (fromIndex.length > 1 || fromIndex < -array.length) {
        return -1
    }
    return -1
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