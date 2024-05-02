import { ContentError, UnauthorizedError } from './errors.js';
import util from './util.js';
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
const URL_REGEX = /^(http|https):\/\//;
const LANGUAGE_REGEX = /^(?=.*\bEN\b)(?:(?:\b(?:EN|ES|IT|DE|PT|RU)\b)(?:,(?:\b(?:EN|ES|IT|DE|PT|RU)\b))*|)(?:,)?$/;
const validate = {
    text(text, explain, checkEmptySpaceInside) {
        if (typeof text !== 'string')
            throw new TypeError(`${explain} ${text} is not a string`);
        if (!text.trim().length)
            throw new ContentError(`${explain} >${text}< is empty or blank`);
        if (checkEmptySpaceInside)
            if (text.includes(' '))
                throw new ContentError(`${explain} ${text} has empty spaces`);
    },
    password(password, explain = 'password') {
        if (!PASSWORD_REGEX.test(password))
            throw new ContentError(`${explain} is not acceptable`);
    },
    url(url, explain) {
        if (!URL_REGEX.test(url))
            throw new ContentError(`${explain} ${url} is not an url`);
    },
    callback(callback, explain = 'callback') {
        if (typeof callback !== 'function')
            throw new TypeError(`${explain} is not a function`);
    },
    language(language, explain = 'language') {
        if (!LANGUAGE_REGEX.test(language))
            throw new TypeError(`${language} contains a not supported ${explain} or not contains EN`);
    },
    token(token, explain = 'token') {
        if (typeof token !== 'string')
            throw new TypeError(`${explain} is not a string`);
        const { exp } = util.extractJwtPayload(token);
        if (exp * 1000 < Date.now())
            throw new UnauthorizedError('session expired');
    },
};
export default validate;

