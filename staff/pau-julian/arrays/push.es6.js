delete Array.prototype.push

function push(firstStr, ...arrays) {
    if (arrays.length > 0) {
        for (let array = 0; array < arrays.length; array++) {
            if (typeof array !== 'number' && typeof array !== 'boolean' && typeof array !== 'string')
                for (let i = 0; i < arrays[array].length; i++) {
                    firstStr[firstStr.length] = arrays[array][i]
                }
            firstStr[firstStr.length] = arrays[array]
        }
    }
    return firstStr.length
}

// CASE 1
{
    const nums = [100, 200, 300, 400, 500]

    const length = push(nums, 600)
    console.log(length)
    // 6
    console.log(nums)
    //[100, 200, 300, 400, 500, 600]
}
//CASE 2

{
    const animals = ['pigs', 'goats', 'sheep']

    const length = push(animals, 'cows')

    console.log(length)
    //4
    console.log(animals)
    // ['pigs', 'goats', 'sheep', 'cows']
}
//CASE 3

{
    const sports = ['soccer', 'baseball']

    const length = push(sports)

    console.log(length)
    // 2
    console.log(sports)
    //['soccer', 'baseball']
}
// CASE 4

{
    const sports = ['soccer', 'baseball']
    const length = push(sports, undefined)
    console.log(length)
    //3
    console.log(sports)
    //['soccer', 'baseball', undefined]
}