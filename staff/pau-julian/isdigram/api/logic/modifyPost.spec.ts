import { MongoClient, ObjectId } from 'mongodb'
import logic from "./index.ts"
import { expect } from 'chai'

describe('logic', () => {
    let client, users, posts

    before((done) => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect()
            .then((connection) => {
                const db = connection.db('test')

                users = db.collection('users')
                posts = db.collection('posts')

                logic.users = users

                done()
            })
            .catch(done)
    })

    //test

    after((done) => {
        client.close()
            .then(() => done())
            .catch(done)
    })
})