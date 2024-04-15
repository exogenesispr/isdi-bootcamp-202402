import { ObjectId } from 'mongodb'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

function logoutUser(userId, callback) {
    validate.text(userId, 'userId', true)
    validate.callback(callback)

    this.users.findOne({ _id: new ObjectId(userId) })
        .then((user) => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            if (user.status === 'offline') {
                callback(new SystemError('user is already offline'))

                return
            }

            this.users.updateOne({ _id: new ObjectId(user._id) }, { $set: { status: 'offline' } })
                .then(() => { callback(null) })
                .catch((error) => { callback(error) })

        })
        .catch(callback(new SystemError('user not found')))
}

export default logoutUser