import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Language } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

dotenv.config()

describe('modifyUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('modifies user dcName, language, online and price', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUser(user.id, 'usernameDCedit', ['EN', 'ES'] as Language[], true, { m10: { value: 100000, lastEdited: new Date() } })
                .then((updatedUser) => {
                    expect(updatedUser.id).to.equal(user.id)

                    expect(updatedUser.dcName).to.equal('usernameDCedit')
                    expect(updatedUser.language).to.deep.equal(['EN', 'ES'])
                    expect(updatedUser.online).to.be.true
                    expect(updatedUser.price.m10.value).to.equal(100000)
                    expect(updatedUser.price.m10.lastEdited).to.be.instanceOf(Date)
                })
            )
    })

    it('fails on modifying unexistant userId user', () => {
        return User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] as Language[], online: false, price: { m10: { value: 0, lastEdited: new Date() } } }))
            .then((user) => logic.modifyUser(new ObjectId().toString(), 'usernameDCedit', ['EN', 'ES'] as Language[], true, { m10: { value: 100000, lastEdited: new Date() } }))
            .catch((error) => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })



    //...

    after(() => mongoose.disconnect())
})