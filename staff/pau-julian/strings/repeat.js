delete String.prototype.repeat

function repeat(string, count) {
    // TODO implement me

    var newString = string;
    for (i = 0; i < count - 1; i++) {
        newString = newString + string;
    };
    return newString;

};

// CASE 1

var s = 'happy! '

var result = repeat(s, 3);

console.assert(result === 'happy! happy! happy! ', 'happy! happy! happy! ')
// 'happy! happy! happy!'