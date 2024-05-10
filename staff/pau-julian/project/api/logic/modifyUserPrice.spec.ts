import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Language } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError } = errors

dotenv.config()

describe('modifyUserPrice', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('modifies user price value', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUserPrice(user.id, 100000)
                .then((updatedUser) => {
                    expect(updatedUser.id).to.equal(user.id)

                    expect(user.price.m10.value).to.equal(0)
                    expect(updatedUser.price.m10.value).to.equal(100000)
                    expect(updatedUser.price.m10.lastEdited).to.be.instanceOf(Date)
                })
            )

    })

    it('fails on modifying unexistant userId user', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUserPrice(new ObjectId().toString(), 100000))
            .catch((error) => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })



    // ...

    after(() => mongoose.disconnect())
})