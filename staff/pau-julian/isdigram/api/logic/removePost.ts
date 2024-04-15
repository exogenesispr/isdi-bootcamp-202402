import { validate, errors } from 'com'
import { ObjectId } from 'mongodb'

const { SystemError, NotFoundError } = errors

function removePost(userId, postId, callback) {
    validate.text(userId, 'userId', true)
    validate.text(postId, 'postId', true)
    validate.callback(callback)

    this.posts.findOne({ _id: new ObjectId(postId) })
        .then((post) => {
            if (!post) {
                callback(new NotFoundError('post not found'))

                return
            }

            if (post.author.toString() !== userId) {
                callback(new SystemError('post does not belong to user'))

                return
            }

            this.posts.deleteOne(post._id = new ObjectId(postId))
                .then(() => callback(null))
                .catch((error) => callback(new SystemError(error.message)))


        })
        .catch((error) => callback(new SystemError(error.message)))
}
export default removePost