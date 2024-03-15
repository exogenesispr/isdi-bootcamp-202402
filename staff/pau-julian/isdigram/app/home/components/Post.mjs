import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Image from '../../core/Image.mjs'
import Component from "../../core/Component.mjs"
import Button from '../../core/Button.mjs'

class Post extends Component {
    constructor(post) {
        super('article')

        const author = new Component('h3')
        author.setText(post.author.username)

        const picture = new Image
        picture.setSource(post.image)

        const paragraph = new Component('p')
        paragraph.setText(post.text)

        const dateTime = new Component('time')
        dateTime.setText(post.date)

        this.add(author, picture, paragraph, dateTime)

        if (post.author.id === logic.getLoggedInUserId()) {
            const deleteButton = new Button
            deleteButton.setText('🗑')

            deleteButton.onClick(() => {
                if (confirm('delete post?'))
                    try {
                        logic.removePost(post.id)

                        //TO DO renderPosts()
                    } catch (error) {
                        utils.showFeedback(error)
                    }
            })

            const editButton = new Button
            editButton.setText('📝')

            editButton.onClick(() => {
                try {
                    // TO DO
                } catch (error) {
                    utils.showFeedback(error)
                }
            })

            this.add(deleteButton, editButton)
        }
    }
}

export default Post