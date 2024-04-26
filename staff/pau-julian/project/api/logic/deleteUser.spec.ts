import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Language } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

dotenv.config()

describe('deleteUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('deletes self user', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.deleteUser(user.id)
                .then((deletedUser) => {
                    expect(deletedUser.username).to.equal(user.username)
                    expect(deletedUser.password).to.equal(user.password)
                    expect(deletedUser.dcName).to.equal(user.dcName)
                    expect(deletedUser.language).to.deep.equal(user.language)
                    expect(deletedUser.online).to.equal(user.online)
                    expect(deletedUser.price.m10.value).to.equal(user.price.m10.value)
                    expect(deletedUser.price.m10.lastEdited).to.deep.equal(user.price.m10.lastEdited)

                    User.find()
                        .then((users) => {
                            expect(users).to.have.lengthOf(0)
                        })
                }))
    })

    //TODO

    after(() => mongoose.disconnect())
})