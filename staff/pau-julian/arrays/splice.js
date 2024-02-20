delete Array.prototype.splice

function splice(array, index, deleteCount, ...items) {
    var returnedArray = []
    index > -1 ? index : index + array.length
    if (deleteCount === undefined) {
        for (var i = index; i < array.length; i++) {
            returnedArray[returnedArray.length] = array[i]
        }
        array.length = array.length - index
    }
    if (deleteCount < array.length) {
        if (deleteCount === 0) {
            array.length = array.length + 1
            for (var i = array.length - 1; i > index - 1; i--) {
                array[i] = array[i - 1]
            }
            for (var i = 0; i < items.length; i++) {
                array[index + i] = items[i]
            }
            return returnedArray
        }
        if (deleteCount === 1) {
            returnedArray[returnedArray.length] = array[index]
            for (var i = 0; i < items.length; i++) {
                array[index + i] = items[i]
            }

            return returnedArray
        }
        if (deleteCount > 1) {
            for (var i = index; i < array.length - deleteCount; i++) {
                returnedArray[returnedArray.length] = array[i]
                array[i + items.length] = array[i + deleteCount]
            }
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    array[i + index] = items[i]
                }
            }
            array.length = array.length - deleteCount
            return returnedArray
        }
    }

}

//TO DO
console.log('CASE 1')

var months = ['Jan', 'March', 'April', 'June']

var extracted = splice(months, 1, 0, 'Feb')
// array // ['Jan', 'March', 'April', 'June']
// start // 1
// deleteCount // 0
// item // 'Feb'

// ['Jan', 'March', 'April', 'June', 'June']
// ['Jan', 'March', 'April', 'April', 'June']
// ['Jan', 'March', 'March', 'April', 'June']

// ['Jan', 'Feb', 'March', 'April', 'June']

console.log(extracted)
// []

console.log(months)
// ["Jan", "Feb", "March", "April", "June"]


console.log('CASE 2')

var months = ['Jan', 'Feb', 'March', 'April', 'June']

var extracted = splice(months, 4, 1, 'May')

// ['Jan', 'Feb', 'March', 'April', 'June']
// var removed = []
// removed[removed.length] = array[start]
// array[start] = item
// return removed

console.log(extracted)
// ['June']

console.log(months)
// ["Jan", "Feb", "March", "April", "May"]


console.log('CASE 3')

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

var extracted = splice(months, 3, 4, 'X')

// ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

// var removed = []
// removed[removed.length] = array[start]
// removed[removed.length] = array[start + 1]
// removed[removed.length] = array[start + 2]
// removed[removed.length] = array[start + 3]

// var elem = array[start + deleteCount]
// array[start + deleteCount - (deleteCount - 1)] = elem
// equal to: array[start + 1] = elem

// var elem = array[start + deleteCount + 1]
// array[start + deleteCount + 1 - (deleteCount - 1)] = elem
// equal to: array[start + 2)] = elem

// var elem = array[start + deleteCount + 2]
// array[start + deleteCount + 2 - (deleteCount - 1)] = elem
// equal to: array[start + 3)] = elem

// array.length -= deleteCount - 1

// array[start] = item

// return removed

console.log(extracted)
// [April', 'May', 'June', 'July']

console.log(months)
// ['Jan', 'Feb', 'March', 'X', 'August', 'September', 'October']


console.log('CASE 4')

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

var extracted = splice(months, 3, 3, 'X')

console.log(extracted)
// [April', 'May', 'June']

console.log(months)
// ['Jan', 'Feb', 'March', 'X', 'July', 'August', 'September', 'October']


console.log('CASE 5')

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

var extracted = splice(months, 3, 2, 'X')

console.log(extracted)
// [April', 'May']

console.log(months)
// ['Jan', 'Feb', 'March', 'X', 'June', 'July', 'August', 'September', 'October']


console.log('CASE 6')

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

var extracted = splice(months, 3, 1, 'X')

console.log(extracted)
// [April']

console.log(months)
// ['Jan', 'Feb', 'March', 'X', 'May', 'June', 'July', 'August', 'September', 'October']
