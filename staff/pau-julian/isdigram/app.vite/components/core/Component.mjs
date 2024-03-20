class Component {
    constructor(tagNameOrContainer = 'div') {
        if (tagNameOrContainer instanceof HTMLElement) {
            this._container = tagNameOrContainer
        } else {
            this._container = document.createElement(tagName)
        }
    }

    setText(text) {
        this._container.innerText = text
    }

    add() {
        const children = arguments

        Array.prototype.forEach.call(children, function (child) {
            if (!child instanceof Component) throw new TypeError('child is not a component')
        })

        Array.prototype.forEach.call(children, function (child) {
            this._container.appendChild(child._container)
        }.bind(this))
    }

    replace(oldChild, newChild) {
        if (!(oldChild instanceof Component)) throw new TypeError('child is not a component')
        if (!(newChild instanceof Component)) throw new TypeError('child is not a component')

        this._container.replaceChild(newChild._container, oldChild._container)
    }

    remove(child) {
        if (!(child instanceof Component)) throw new TypeError('child is not a component')

        this._container.removeChild(child._container)
    }

    removeAll() {
        this._container.innerHTML = ''
    }

    assembleTo(element) {
        if (!(element instanceof HTMLElement)) throw new TypeError('element is not an HTMLElement')

        element.appendChild(this._container)
    }

    onClick(callback) {
        this._container.onclick = callback
    }

    setId(id) {
        if (typeof id !== 'string') throw new TypeError('id is not a string')

        this._container.id = id
    }

    addClass(classname) {
        this._container.classList.add(classname)
    }
}

export default Component