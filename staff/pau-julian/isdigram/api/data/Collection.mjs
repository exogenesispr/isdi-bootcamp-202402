import fs from 'fs'

class Collection {
    constructor(name) {
        this.name = name
    }


    // HELPERS

    _generateId() {
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }

    _loadDocuments(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        fs.readFile(`./data/${this.name}.json`, 'utf8', (error, documentsJSON) => {
            if (error) {
                callback(error)
                return
            }
            const documents = JSON.parse(documentsJSON || '[]')

            callback(null, documents)
        })
    }

    _saveDocuments(documents, callback) {
        if (!(documents instanceof Array)) throw new TypeError(documents + ' is not an array')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        documents.forEach((document) => {
            if (!(document instanceof Object)) throw new TypeError('a document in documents is not an object')
        })

        const documentsJSON = JSON.stringify(documents)

        fs.writeFile(`./data/${this.name}.json`, documentsJSON, (error) => {

            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    }

    // CRUD

    findOne(condition, callback) {
        if (typeof callback !== 'function') throw new TypeError('condition callback is not a function')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            const document = documents.find(condition)

            callback(null, document)
        })
    }

    insertOne(document) {
        const documents = this._loadDocuments()

        document.id = this._generateId()

        documents.push(document)

        this._saveDocuments(documents)
    }

    updateOne(document) {
        const documents = this._loadDocuments()

        const index = documents.findIndex(function (document2) {
            return document2.id === document.id
        })

        if (index > -1) {
            documents.splice(index, 1, document)

            this._saveDocuments(documents)
        }
    }

    deleteOne(callback) {
        const documents = this._loadDocuments()

        const index = documents.findIndex(callback)

        if (index > -1) {
            documents.splice(index, 1)

            this._saveDocuments(documents)
        }
    }

    getAll() {
        const documents = this._loadDocuments()

        return documents
    }

    printAll() {
        const document = this._loadDocuments()

        console.table(document)
    }
}

export default Collection