import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { SystemError } = errors

dotenv.config()

describe('retrieveUsersByStatus', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves both users with online status and price >0', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: true, price: { m10: { value: 100000, lastEdited: new Date } } }))
            .then((user1) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'], online: true, price: { m10: { value: 200000, lastEdited: new Date } } })
                    .then((user2) => logic.retrieveUsersByStatus()
                        .then((users) => {
                            expect(users).to.have.lengthOf(2)

                            expect(users[0].username).to.equal(user1.username)
                            expect(users[0].dcName).to.equal(user1.dcName)
                            expect(users[0].language).to.deep.equal(user1.language)
                            expect(users[0].online).to.be.true
                            expect(users[0].price.m10).to.deep.equal(user1.price.m10)

                            expect(users[1].username).to.equal(user2.username)
                            expect(users[1].dcName).to.equal(user2.dcName)
                            expect(users[1].language).to.deep.equal(user2.language)
                            expect(users[1].online).to.be.true
                            expect(users[1].price.m10).to.deep.equal(user2.price.m10)

                        }))
            })
    })

    it('retrieves one user with online status and price >0', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: true, price: { m10: { value: 100000, lastEdited: new Date } } }))
            .then((user1) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'], online: false, price: { m10: { value: 200000, lastEdited: new Date } } })
                    .then((user2) => logic.retrieveUsersByStatus()
                        .then((users) => {
                            expect(users).to.have.lengthOf(1)

                            expect(users[0].username).to.equal(user1.username)
                            expect(users[0].dcName).to.equal(user1.dcName)
                            expect(users[0].language).to.deep.equal(user1.language)
                            expect(users[0].online).to.be.true
                            expect(users[0].price.m10).to.deep.equal(user1.price.m10)
                        }))
            })
    })

    it('retrieves second user with online status and price >0', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
            .then((user1) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'], online: true, price: { m10: { value: 200000, lastEdited: new Date } } })
                    .then((user2) => logic.retrieveUsersByStatus()
                        .then((users) => {
                            expect(users).to.have.lengthOf(1)

                            expect(users[0].username).to.equal(user2.username)
                            expect(users[0].dcName).to.equal(user2.dcName)
                            expect(users[0].language).to.deep.equal(user2.language)
                            expect(users[0].online).to.be.true
                            expect(users[0].price.m10).to.deep.equal(user2.price.m10)
                        }))
            })
    })

    it('retrieves no user', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
            .then((user1) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'], online: false, price: { m10: { value: 200000, lastEdited: new Date } } })
                    .then((user2) => logic.retrieveUsersByStatus()
                        .then((users) => {
                            expect(users).to.have.lengthOf(0)
                        }))
            })
    })

    after(() => mongoose.disconnect())
})