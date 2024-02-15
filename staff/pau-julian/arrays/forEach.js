delete Array.prototype.forEach

function forEach(array, callbackFn) {
    objectSolution = {}
    for (var i = 0; i < array.length; i++) {
        objectSolution[i] = callbackFn(array[i])
    }
    return objectSolution
}

console.log('case 1')

const array1 = [3, 4, 111];

result = forEach(array1, x => x * x)


