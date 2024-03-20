import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Image from '../../core/Image.mjs'
import Component from "../../core/Component.mjs"
import Button from '../../core/Button.mjs'
import PostList from './PostList.mjs'
import EditPost from './EditPost.mjs'

class Post extends Component {
    constructor(post) {
        super('article')
        this._post = post

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

                        this._onDeletedCallback()
                    } catch (error) {
                        utils.showFeedback(error)
                    }
            })

            const editButton = new Button
            editButton.setText('📝')
            this._editButton = editButton


            editButton.onClick(() => this._onEditButtonClick())


            this.add(deleteButton, editButton)
        }

        this._onDeletedCallback = null
        this._onEditedCallback = null
        this._onEditButtonClick = null
    }

    onDeleted(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onDeletedCallback = callback
    }

    onEdited(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onEditedCallback = callback
    }

    onEditButtonClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onEditButtonClick = callback
    }
}


export default Post