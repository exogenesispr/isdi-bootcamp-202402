import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { Language } from '../data/index.ts'

dotenv.config()

const { SystemError, ContentError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on creating a new User', () => {
        User.deleteMany()
            .then(() => logic.registerUser('username', '123qwe123', 'usernameDC', [Language.EN, Language.ES]))
            .then(() => User.findOne({ username: 'username' }))
            .then((user) => {
                expect(!!user).to.be.true
                expect(user.username).to.equal('username')
                expect(user.password).to.equal('123qwe123')
                expect(user.dcName).to.equal('usernameDC')
                expect(user.language[0]).to.equal('EN')
                expect(user.language[1]).to.equal('ES')
            })
    })

    it('fails on existing user', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] }))
            .then(() => logic.registerUser('username', '123qwe123', 'usernameDC', [Language.EN, Language.ES]))
            .catch((error) => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('user already exists')
            })
    })

    it('fails on empty username', () => {
        let errorThrown

        try {

            logic.registerUser('', '123qwe123', 'usernameDC', [Language.EN, Language.ES])
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('username >< is empty or blank')
    })

    it('fails on empty password', () => {
        let errorThrown

        try {

            logic.registerUser('username', '', 'usernameDC', [Language.EN, Language.ES])
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })

    it('fails on already used dcName', () => {
        User.deleteMany()
            .then(() => User.create({ username: 'username', password: '123qwe123', dcName: 'usernameDC', language: ['EN', 'ES'] }))
            .then(() => logic.registerUser('username2', '123qwe123', 'usernameDC', [Language.EN, Language.ES]))
            .catch((error) => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.equal('user already exists')
            })
    })

    it('fails on empty dcName', () => {
        let errorThrown

        try {
            logic.registerUser('username', '123qwe123', '', [Language.EN, Language.ES])
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('Discord name >< is empty or blank')
    })

    it('fails on empty language array', () => {
        let errorThrown

        try {
            logic.registerUser('username', '123qwe123', 'usernameDC', [])
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal(' contains a not supported language or not contains EN')
    })

    it('fails on non-EN language array', () => {
        let errorThrown

        try {
            logic.registerUser('username', '123qwe123', 'usernameDC', [Language.ES])
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('ES contains a not supported language or not contains EN')
    })


    after(() => mongoose.disconnect())
})