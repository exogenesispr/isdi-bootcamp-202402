import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

dotenv.config()

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing user', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'], online: false, price: { m10: { value: 100000, lastEdited: new Date } } }))
            .then((user) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'] })
                    .then((user2) => logic.retrieveUser(user.id, user2.id))
                    .then((user) => {
                        expect(user.username).to.equal('username2')
                        expect(user.dcName).to.equal('usernameDC2')
                    })
            })
    })

    it('fails to retrieve a non-existing user by existing user', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] }))
            .then((user) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'] })
                    .then(() => logic.retrieveUser(user.id, new ObjectId().toString()))
                    .catch((error) => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            })
    })

    it('fails to retrieve by non-existing user', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] }))
            .then((user) => {
                User.create({ username: 'username2', password: '123qwe123', dcName: 'usernameDC2', language: ['EN', 'ES'] })
                    .then((user2) => logic.retrieveUser(new ObjectId().toString(), user2.id))
                    .catch((error) => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    it('finds same user', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] }))
            .then((user) => {
                logic.retrieveUser(user.id, user.id)
                    .then((user2) => {
                        expect(user).to.deep.equal(user2)
                    })
            })
    })

    after(() => mongoose.disconnect())
})