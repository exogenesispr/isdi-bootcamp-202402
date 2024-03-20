import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Component from '../../core/Component.mjs'
import Form from '../../core/Form.mjs'
import Label from '../../core/Label.mjs'
import Input from '../../core/Input.mjs'
import Button from '../../core/Button.mjs'

class Chat extends Component {
    constructor() {
        super('section')

        const userList = new UserList

        this.add(userList)
    }
}

//export default Chat