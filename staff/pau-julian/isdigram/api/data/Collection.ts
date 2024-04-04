//@ts-ignore cannot find module 'fs' or its corresponding type declarations
import { readFile, writeFile } from "fs"

type User = {
    name: string
    birthdate: string
    email: string
    username: string
    password: string
    status: string
    id?: string
}

type Post = {
    author: string
    image: string
    text: string
    date: string
    id?: string
}

type Chat = {
    users: [string, string]
    messages: string[]
    id?: string
}

type Car = {
    brand: string
    model: string
    id?: string
}

type Document = User | Post | Chat | Car

class Collection {
    name: string
    constructor(name: string) {
        this.name = name
    }

    // HELPERS

    _generateId() {
        // @ts-ignore
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }

    _loadDocuments(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        readFile(`./data/${this.name}.json`, 'utf8', (error, documentsJSON) => {
            if (error) {
                callback(error)
                return
            }
            const documents = JSON.parse(documentsJSON || '[]')

            callback(null, documents)
        })
    }

    _saveDocuments(documents: Document, callback) {
        if (!(documents instanceof Array)) throw new TypeError(documents + ' is not an array')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        documents.forEach((document) => {
            if (!(document instanceof Object)) throw new TypeError('a document in documents is not an object')
        })

        const documentsJSON = JSON.stringify(documents)

        writeFile(`./data/${this.name}.json`, documentsJSON, (error) => {

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

            callback(null, document || null)
        })
    }

    insertOne(document: Document, callback): void {
        if (!(document instanceof Object)) throw new TypeError('document is not an object')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            document.id = this._generateId()

            documents.push(document)

            this._saveDocuments(documents, (error) => {
                if (error) {
                    callback(error)

                    return
                }
                callback(null, document.id)
            })
        })
    }

    updateOne(condition, document: Document, callback): void {
        if (typeof condition !== 'function') throw new TypeError('condition callback is not a function')
        if (typeof document !== 'object') throw new TypeError('document is not an object')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            const index = documents.findIndex(condition)

            if (index > -1) {
                documents.splice(index, 1, document)

                this._saveDocuments(documents, (error) => {
                    if (error) {
                        callback(error)

                        return
                    }
                    callback(null, true)
                })

                return
            }

            callback(null, false)
        })
    }

    deleteOne(condition, callback): void {
        if (typeof condition !== 'function') throw new TypeError('condition callback is not a function')
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            const index = documents.findIndex(condition)

            if (index > -1) {
                documents.splice(index, 1)

                this._saveDocuments(documents, (error) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    callback(null, true)
                })
                return
            }
            callback(null, false)
        })
    }

    getAll(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }
            callback(null, documents)
        })
    }
}

export default Collection