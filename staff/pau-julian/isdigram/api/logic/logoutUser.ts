import { ObjectId } from 'mongodb'
import { validate, errors } from 'com'

function logoutUser(userId, callback) {
    // validate.text(userId, 'userId', true)
    // validate.callback(callback)

    // this.users.findOne({ _id: new ObjectId(userId) })
    //     .then((user) => {
    //         this.users.updateOne({ _id: user._id }, { $set: { status: 'offline' } })
    //             .then(() => { callback(null) })
    //             .catch((error) => { callback(error) })

    //     })
    //     .catch(callback(new Error('user not found')))
}

export default logoutUser