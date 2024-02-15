delete Array.prototype.includes

function includes(array, value, fromIndex) {
    if (arguments.length < 3) {
        for (i = 0; i < array.length; i++) {
            var element = array[i]

            if (element === value) {
                return true
            }
        }
        return false
    } else {
        if (fromIndex > -1) {
            for (var i = fromIndex; i < array.length; i++) {
                var element = array[i]

                if (element === value) {
                    return true
                }
                return false
            }
        } else {
            var newIndex = array.length + fromIndex

            for (var i = newIndex; i < array.length; i++) {
                var element = array[i]

                if (element === value) {
                    return true
                }
                return false
            }

        }
    }
}