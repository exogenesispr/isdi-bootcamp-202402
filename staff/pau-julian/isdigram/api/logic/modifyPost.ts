import { validate, errors } from 'com'

function modifyPost(postId, text, callback) {
    // validate.text(postId, 'postId', true)
    // validate.text(text, 'text')
    // validate.callback(callback)

    // db.posts.findOne((post) => post.id === postId, (error, post) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     if (!post) {
    //         callback(new Error('post not found'))

    //         return
    //     }

    //     if (post.author !== sessionStorage.userId) {
    //         callback(new Error('post does not belong to user'))

    //         return
    //     }

    //     post.text = text

    //     db.posts.updateOne((post2) => post2.id === post.id, post, (error) => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         callback(null)
    //     })
    // })
}

export default modifyPost