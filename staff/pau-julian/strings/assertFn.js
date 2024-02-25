function assertFn(x, y) {
    for (var i; i < x.length; i++) {
        console.assert(x[i] === y[i], y[i])
    }
}