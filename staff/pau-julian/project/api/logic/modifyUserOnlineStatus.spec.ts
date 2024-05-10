import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Language } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

dotenv.config()

describe('modifyUserOnlineStatus', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('modifies user online status to true', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUserOnlineStatus(user.id, true)
                .then((updatedUser) => {
                    expect(updatedUser.id).to.equal(user.id)

                    expect(user.online).to.be.false
                    expect(updatedUser.online).to.be.true

                })
            )
    })

    it('modifies user online status to false', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: true, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUserOnlineStatus(user.id, false)
                .then((updatedUser) => {
                    expect(updatedUser.id).to.equal(user.id)

                    expect(user.online).to.be.true
                    expect(updatedUser.online).to.be.false

                })
            )
    })

    it('fails on modifying unexistant userId user', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUserOnlineStatus(new ObjectId().toString(), true))
            .catch((error) => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })



    // ...

    after(() => mongoose.disconnect())
})