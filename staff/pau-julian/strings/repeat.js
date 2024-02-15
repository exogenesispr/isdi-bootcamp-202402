delete String.prototype.repeat

function repeat(string, count) {
    // TODO implement me
    debugger

    var newString = string;
    for (i = 0; i < count; i++) {
        newString = newString + string;
    };
    return newString;

};

// CASE 1

var s = 'happy! '

var result = repeat(s, 3);

console.log(result)
// 'happy! happy! happy!'