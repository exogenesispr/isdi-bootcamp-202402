delete Array.prototype.forEach

function forEach(array, callbackFn) {
    var callbackType = typeof callbackFn;
    if (callbackType !== "function" && callbackType !== "object" && callbackType !== "undefined") {
        throw new TypeError(callbackType + " " + callbackFn + " is not a function")
    } else if (callbackType === "object" || callbackType === "undefined") {
        throw new TypeError(callbackType + " is not a function")
    }
    for (var i = 0; i < array.length; i++) {
        callbackFn(array[i], i, array)
    }
}

console.log('case 1')

const array1 = [3, 4, 111];

result = forEach(array1, x => x * x)


console.log("CASE 1");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num) {
    console.log(num);
});
// 10
// 20
// 30
// 40
// 50

console.log("CASE 2");

var nums = [10, 20, 30, 40, 50];
var sum = 0;

forEach(nums, function (num) {
    sum += num;
});

console.log(sum);
// 150

console.log("CASE 3");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num, index) {
    console.log(num + index);
});
// 10
// 21
// 32
// 43
// 54

console.log("CASE 4");

var nums = [10, 20, 30, 40, 50];

forEach(nums, function (num, index, array) {
    console.log(num + index + array.length);
});
// 15
// 26
// 37
// 48
// 59

console.log("CASE 5");

var nums = [10, 20, 30, 40, 50];

try {
    forEach(nums);
} catch (error) {
    console.log(error);
    console.log('it should log TypeError: undefined is not a function')
}

console.log("CASE 6");

var nums = [10, 20, 30, 40, 50];

try {
    forEach(nums, {});
} catch (error) {
    console.log(error);
    console.log('it should log TypeError: object is not a function')
}

console.log("CASE 7");

var nums = [10, 20, 30, 40, 50];

try {
    forEach(nums, 123);
} catch (error) {
    console.log(error);
    console.log('it should log TypeError: number 123 is not a function')
}

console.log("CASE 8");

var nums = [10, 20, 30, 40, 50];

try {
    forEach(nums, true);
} catch (error) {
    console.log(error);
    console.log('it should log TypeError: boolean true is not a function')
}

console.log("CASE 9");

var nums = [10, 20, 30, 40, 50];

try {
    forEach(nums, !true);
} catch (error) {
    console.log(error);
    console.log('it should log TypeError: boolean false is not a function')
}