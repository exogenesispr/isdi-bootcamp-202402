delete Array.prototype.includes

function includes(array, searchElement, fromIndex) {
    debugger
    if (fromIndex >= 0 && fromIndex < array.length && fromIndex.length === 1) {
        if (array[fromIndex] === searchElement) {
            return true
        }
    } else if (fromIndex < 0 && fromIndex > -array.length) {
        if (array[fromIndex + array.length] === searchElement) {
            return true
        }
    } else if (fromIndex === undefined) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === searchElement) {
                return true
            }
        }
    } else if (fromIndex.length > 1 || fromIndex < -array.length) {
        return false
    }
    return false
}

// case 1

var x = ['hol', 'aqu', 'et', 'al', 'estas']
result = includes(x, 'aqu')
console.log(result)
//true

// case 2

var x = ['hol', 'aqu', 'et', 'al', 'estas']
result2 = includes(x, 5)
console.log(result2)
//false

// case 3

var x = ['hol', 'aqu', 'et', 'al', 'estas']
result3 = includes(x, 'estas', -1)
console.log(result3)
//true
