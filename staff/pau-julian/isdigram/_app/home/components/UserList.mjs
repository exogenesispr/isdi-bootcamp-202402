import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Component from '../../core/Component.mjs'


class UserList extends Component {
    constructor() {
        super('ul')

        try {
            const users = logic.retrieveUsers()

            //let chat = null

            users.forEach(user => {
                const userItem = new Component('li')

                userItem.setText(user.username)

                userItem.addClass('user-list__item')

                if (user.status === 'online') {
                    userItem.addClass('user-list__item--online')
                } else {
                    userItem.addClass('user-list__item--offline')
                }

                userItem.onClick(() => {
                    chat = new ChatDiv
                    //userList creates a ChatDiv in Chat
                })

                const sendMessageForm = new SendMessageForm

                this.add(userItem)
            })
        } catch (error) {
            utils.showFeedback(error)
        }
    }
}