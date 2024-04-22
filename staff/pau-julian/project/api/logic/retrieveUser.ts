import { validate, errors } from 'com'

import { UserType, User, Language } from '../data/index.ts'

const { NotFoundError, SystemError } = errors

function retrieveUser(userId: string, targetUserId: string): Promise<{ username: string | {}, dcName: string | {} }> {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)

    return User.findById<UserType>(userId)
        .catch((error) => { throw new Error(error.message) })
        .then((user: UserType) => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).select('-_id -language username dcName').lean()
        })
        .then((user) => {
            if (!user) throw new NotFoundError('target user not found')

            return { username: user.username, dcName: user.dcName }
        })
}

export default retrieveUser