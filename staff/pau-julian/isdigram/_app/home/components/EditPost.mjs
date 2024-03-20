import logic from "../../logic.mjs"

import utils from "../../utils.mjs"

import Component from "../../core/Component.mjs"
import Button from '../../core/Button.mjs'
import Label from '../../core/Label.mjs'
import Input from '../../core/Input.mjs'
import Form from '../../core/Form.mjs'


class EditPost extends Component {
    constructor(post) {
        super('section')

        this.addClass('edit-post')

        var title = new Component('h2')
        title.setText('Edit Post')

        var form = new Form

        var textLabel = new Label
        textLabel.setFor('text')
        textLabel.setText('Text')

        var textInput = new Input
        textInput.setId('text')
        textInput.setType('text')
        textInput.setValue(post.text)

        var editButton = new Button
        editButton.setType('submit')
        editButton.setText('Edit')

        form.add(title, textLabel, textInput, editButton)

        var cancelButton = new Button
        cancelButton.setText('Cancel')

        this._cancelButton = cancelButton

        this.add(form, cancelButton)

        form.onSubmit((event) => {
            event.preventDefault()

            const text = textInput.getValue()

            try {
                logic.modifyPost(post.id, text)

                this._onPostEditedCallback()
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        this._onPostEditedCallback = null
    }

    static active = false

    onCancelClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._cancelButton.onClick(callback)
    }

    onPostEdited(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onPostEditedCallback = callback
    }
}

export default EditPost