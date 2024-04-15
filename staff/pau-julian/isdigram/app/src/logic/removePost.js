function removePost(postId) {
    validate.text(postId, 'postId')

    const post = db.posts.findOne(function (post) {
        return post.id === postId
    })

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    db.posts.deleteOne(function (post) {
        return post.id === postId
    })
}

export default removePost