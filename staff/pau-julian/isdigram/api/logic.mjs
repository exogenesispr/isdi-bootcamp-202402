// Constants
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/
const URL_REGEX = /^(http|https):\/\//

// Helpers

function validateText(text, explain, checkEmptySpaceInside) {
    if (typeof text !== 'string') throw new Error(explain + ' ' + ' is not a string')
    if (!text.trim().length) throw new Error(explain + ' >' + text + '< is empty or blank')

    if (checkEmptySpaceInside) {
        if (text.includes(' ')) throw new Error(explain + ' ' + text + ' has empty spaces')
    }
}

function validateDate(date, explain) {
    if (typeof date !== 'string') throw new TypeError(explain + '' + date + ' is not a string')
    if (!DATE_REGEX.test(date)) throw new Error(explain + ' ' + date + ' does not have a valid format')
}

function validateEmail(email, explain) {
    if (typeof email !== 'string') throw new TypeError(explain + '' + email + ' is not a email')
    if (!EMAIL_REGEX.test(email)) throw new Error(explain + ' ' + email + ' is not an email')
}

function validatePassword(password, explain) {
    if (!PASSWORD_REGEX.test(password)) throw new Error(explain + ' ' + password + ' is not acceptable')
}

function validateUrl(url, explain) {
    if (!URL_REGEX.test(url)) throw new Error(explain + ' ' + url + ' is not an url')
}

// Logic

function registerUser(name, birthdate, email, username, password) {
    validateText(name, 'name')
    validateDate(birthdate, 'birthday')
    validateEmail(email, 'email')
    validateText(username, 'username', true)
    validatePassword(password, 'password')

}

// DEMO

registerUser('Peter Pan', '2000-01-01', 'peter@pan.com', 'peterpan', '123qwe123')