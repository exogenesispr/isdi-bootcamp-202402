import { validate, errors } from 'com'
import { UserType, User, Language } from '../data/index.ts'
const { SystemError, NotFoundError, ContentError } = errors

function deleteUser(userId: string) {
    validate.text(userId, 'userId', true)

    return User.findByIdAndDelete(userId)
        .catch((error) => { throw new SystemError(error.message) })
        .then((deletedUser) => {
            if (!deletedUser)
                throw new NotFoundError('user not found')

            return deletedUser
        })
}

export default deleteUser