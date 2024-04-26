import { validate, errors } from 'com'

import { UserType, User, Language } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function modifyUser(
    userId: string,
    dcName: string,
    language: Language[],
    online: boolean,
    price: { m10: { value: number, lastEdited: Date } }
) {
    validate.text(userId, 'userId', true)
    validate.text(dcName, 'Discord name', true)
    validate.language(language)

    const update: {
        dcName?: string,
        language?: Language[],
        online?: boolean,
        price?: { m10: { value: number, lastEdited: Date } }
    } = {}

    if (dcName) {
        update.dcName = dcName
    }
    if (language) {
        update.language = language
    }
    if (online) {
        update.online = online
    }
    if (price) {
        update.price = price
    }

    return User.findByIdAndUpdate(userId, update, { new: true })
        .catch((error) => { throw new SystemError(`Failed to modify user: ${error.message}`) })
        .then((updatedUser) => {
            if (!updatedUser) throw new NotFoundError('user not found')

            return updatedUser
        })

}

export default modifyUser