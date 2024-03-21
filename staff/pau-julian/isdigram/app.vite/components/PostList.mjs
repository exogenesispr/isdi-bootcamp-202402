import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from './core/Component.mjs'
import Post from './Post.mjs'

class PostList extends Component {
    constructor() {
        super('section')

        this.refresh()

        //setInterval(() => PostList.active && this.refresh(), 5000)

        PostList.active = true

        this._onEditPostClickCallback = null
    }

    static active = false

    refresh() {
        try {
            const postList = logic.retrievePosts()

            this.removeAll()

            postList.forEach((post) => {
                const post2 = new Post(post)

                post2.onEdited(() => { this.refresh() })

                post2.onEditClick((post) => this._onEditPostClickCallback(post))

                post2.onDeleted(() => { this.refresh() })

                this.add(post2)
            })
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    onEditPostClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onEditPostClickCallback = callback
    }
}

export default PostList