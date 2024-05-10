import { validate, errors } from 'com'

import { UserType, User, Language } from '../data/index.ts'

const { SystemError } = errors

function registerUser(
    username: string,
    password: string,
    dcName: string,
    language: Language[]
): Promise<void> {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.text(dcName, 'Discord name', true)
    validate.language(language)

    return User.findOne({ $or: [{ username }, { dcName }] })
        .catch((error) => { throw new SystemError(error.message) })
        .then((user: UserType | null) => {
            if (user) {
                throw new SystemError('user already exists')
            }

            const newUser = {
                username: username,
                password: password,
                dcName: dcName,
                language: language,
                online: false,
                price: {
                    m10: {
                        value: 0,
                        lastEdited: new Date
                    },
                }
            }

            return User.create(newUser)
                .catch((error) => { throw new Error(error.message) })
                .then((user) => { })
        })
}

export default registerUser