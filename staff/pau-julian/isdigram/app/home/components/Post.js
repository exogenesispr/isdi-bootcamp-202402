function Post(post) {
    Component.call(this, 'article')

    var author = new Component('h3')
    author.setText(post.author.username)

    var picture = new Image
    picture.setSource(post.image)

    var paragraph = new Component('p')
    paragraph.setText(post.text)

    var dateTime = new Component('time')
    dateTime.setText(post.date)

    this.add(author, picture, paragraph, dateTime)

    if (post.author.id === logic.getLoggedInUserId()) {
        var deleteButton = new Button
        deleteButton.setText('🗑')

        deleteButton.onClick(function () {
            if (confirm('delete post?'))
                try {
                    logic.removePost(post.id)

                    //TO DO renderPosts()
                } catch (error) {
                    showFeedback(error)
                }
        })

        var editButton = new Button
        editButton.setText('📝')

        editButton.onClick(function () {
            // TO DO open edit panel
        })

        this.add(deleteButton, editButton)
    }
}

Post.prototype = Object.create(Component.prototype)
Post.prototype.constructor = Post