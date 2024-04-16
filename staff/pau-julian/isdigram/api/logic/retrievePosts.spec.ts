import mongoose from 'mongoose'

import { Post, PostType, User, UserType } from '../data/index.ts'

import logic from "./index.ts"
import { expect } from 'chai'
import { errors } from 'com'

const { CredentialsError, NotFoundError } = errors

describe('retrievePosts', () => {

    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    //test

    it('retrieves all posts for existing user', () => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                .then((user) => {
                    const insertedPosts = []

                    let count = 1

                    const post1 = { author: user.id, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                    Post.create(post1)
                        .then((insertedPost1) => {
                            insertedPosts.push(post1)

                            count++

                            const post2 = { author: user.id, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                            Post.create(post2)
                                .then((insertedPost2) => {
                                    insertedPosts.push(post2)

                                    count++

                                    const post3 = { author: user.id, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

                                    Post.create(post3)
                                        .then((insertedPost3) => {
                                            insertedPosts.push(post3)

                                            logic.retrievePosts(user.id)
                                                .then((posts) => {

                                                    expect(posts).to.have.lengthOf(3)

                                                    const post1 = posts[2]

                                                    expect(post1.author.username).to.equal('peperoni')
                                                    expect(post1.author.id).to.equal(result.insertedId.toString())
                                                    expect(post1.image).to.equal(insertedPost1.image)
                                                    expect(post1.text).to.equal(insertedPost1.text)
                                                    expect(post1.date).to.equal(insertedPost1.date)

                                                    const post2 = posts[1]

                                                    expect(post2.author.username).to.equal('peperoni')
                                                    expect(post2.author.id).to.equal(result.insertedId.toString())
                                                    expect(post2.image).to.equal(insertedPost2.image)
                                                    expect(post2.text).to.equal(insertedPost2.text)
                                                    expect(post2.date).to.equal(insertedPost2.date)

                                                    const post3 = posts[0]

                                                    expect(post3.author.username).to.equal('peperoni')
                                                    expect(post3.author.id).to.equal(result.insertedId.toString())
                                                    expect(post3.image).to.equal(insertedPost3.image)
                                                    expect(post3.text).to.equal(insertedPost3.text)
                                                    expect(post3.date).to.equal(insertedPost3.date)
                                                })
                                        })
                                })
                        })
                })
            )

    })
})
// it('fails on orphan post', (done) => {
//         db.users.deleteAll((error) => {
//             if (error) {
//                 done(error)

//                 return
//             }

//             db.posts.deleteAll((error) => {
//                 if (error) {
//                     done(error)

//                     return
//                 }

//                 db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
//                     if (error) {
//                         done(error)

//                         return
//                     }

//                     const insertedPosts = []

//                     let count = 1

//                     const insertedPost1 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

//                     db.posts.insertOne(insertedPost1, (error, insertedPostId1) => {
//                         if (error) {
//                             done(error)

//                             return
//                         }

//                         insertedPosts.push(insertedPost1)

//                         count++

//                         const insertedPost2 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

//                         db.posts.insertOne(insertedPost2, (error, insertedPostId2) => {
//                             if (error) {
//                                 done(error)

//                                 return
//                             }

//                             insertedPosts.push(insertedPost2)

//                             count++

//                             const insertedPost3 = { author: 'unknown-user-id', image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date().toLocaleDateString('en-CA') }

//                             db.posts.insertOne(insertedPost3, (error, insertedPostId3) => {
//                                 if (error) {
//                                     done(error)

//                                     return
//                                 }

//                                 insertedPosts.push(insertedPost3)

//                                 logic.retrievePosts(insertedUserId, (error, posts) => {
//                                     expect(error).to.be.instanceOf(Error)

//                                     expect(error.message).to.equal('post owner not found')

//                                     expect(posts).to.be.undefined

//                                     done()
//                                 })
//                             })
//                         })
//                     })
//                 })
//             })
//         })
//     })
// })


after((done) => {
    client.close()
        .then(() => done())
        .catch(done)
})
})