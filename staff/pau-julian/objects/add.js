/**
 * 
 * @param {object} The iterable object to mutate. 
 * @param {value} The value to add.
 * 
 * @throws {TypeError} When object is not an object.
 */
function add(object, value) {
    if (object instanceof Object) {
        if (arguments === 2) {
            object[object.length] = value
            object.length++
            return object.length
        } else {
            return object
        }
    } else {
        throw TypeError(object + ' is not an object')
    }
}