import Component from "../../core/Component.mjs"

class EditPost {
    constructor(post) {
        super('section')

        var title = new Component('h2')
        title.setText('Edit Post')

        var form = new Component('form')

        var textLabel = new Label
        textLabel.setFor('text')
        textLabel.setText('Text')

        var textInput = new Input
        textInput.setId('text')
        textInput.setType('text')
        textInput.setText(post.text)

        var editButton = new Button
        editButton.setType('submit')
        editButton.setText('Edit')

        form.add(textLabel, textInput, editButton)

        var cancelButton = new Button
        cancelButton.onClick(function () {
            // .remove()
        })
        cancelButton.setText('Cancel')

        this.add(form, cancelButton)
    }
}

export default EditPost