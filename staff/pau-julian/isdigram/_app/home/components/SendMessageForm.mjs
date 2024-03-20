import Button from "../../core/Button.mjs"
import Component from "../../core/Component.mjs"
import Input from "../../core/Input.mjs"
import Label from "../../core/Label.mjs"
import logic from "../../logic.mjs"
import utils from "../../utils.mjs"

class SendMessageForm extends Component {
    constructor() {
        super('form')

        const textLabel = new Label
        textLabel.setText('Text')
        textLabel.setFor('text')

        const textInput = new Input
        textInput.setId('text')

        const sendButton = new Button
        sendButton.setType('submit')
        sendButton.setText('Send')

        SendMessageForm.add(textLabel, textInput, sendButton)

    }

    onSubmit(event) {
        event.preventDefault()

        const text = textInput.getValue()

        try {
            logic.sendMessageToUser(user.id, text)

            this.reset()

            renderMessages.call(chat)
        } catch (error) {
            utils.showFeedback(error)
        }
    }
}

export default SendMessageForm