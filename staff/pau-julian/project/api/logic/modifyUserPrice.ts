import { validate, errors } from 'com'

import { User } from '../data/index.ts'
const { SystemError, NotFoundError } = errors

function modifyUserPrice(
    userId: string,
    newPrice: number,
) {
    validate.text(userId, 'userId', true)

    const update: {
        price?: {
            m10: {
                value: number,
                lastEdited: Date
            }
        }
    } = {}

    if (newPrice) {
        update.price = {
            m10: {
                value: newPrice,
                lastEdited: new Date()
            }
        }
    }

    return User.findByIdAndUpdate(userId, { $set: update }, { new: true })
        .catch((error) => { throw new SystemError(`Failed to modify user status: ${error.message}`) })
        .then((updatedUser) => {
            if (!updatedUser) throw new NotFoundError('user not found')

            return updatedUser
        })
}

export default modifyUserPrice