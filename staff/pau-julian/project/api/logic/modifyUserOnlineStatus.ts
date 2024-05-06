import { validate, errors } from 'com'

import { User } from '../data'
const { SystemError, NotFoundError } = errors

function modifyUserOnlineStatus(
    userId: string,
    online: boolean,
) {
    validate.text(userId, 'userId', true)

    const update: {
        online?: boolean
    } = {}

    if (online) {
        update.online = online
    }

    return User.findByIdAndUpdate(userId, update, { new: true })
        .catch((error) => { throw new SystemError(`Failed to modify user status: ${error.message}`) })
        .then((updatedUser) => {
            if (!updatedUser) throw new NotFoundError('user not found')

            return updatedUser
        })
}

export default modifyUserOnlineStatus