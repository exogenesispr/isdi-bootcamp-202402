// utils

//function to give x seconds without doing anything

function block(millis) {
    var before = Date.now()
    while (Date.now() - before < millis);
}