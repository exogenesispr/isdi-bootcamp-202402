delete Array.prototype.findIndex

function findIndex(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === true) {
            return i
        }
    }
    return -1
}

console.log('case 1')

var people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

var found = findIndex(people, function (person) {
    return person.age === 25;
});
console.log(found)
console.log('it should return 1')