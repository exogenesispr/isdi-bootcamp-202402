import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, WowToken } from '../data/index.ts'

const { Types: { ObjectId } } = mongoose

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { SystemError } = errors

dotenv.config()


describe('retrieveWowTokenData', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves wow token data from db', () => {
        return WowToken.deleteMany()
            .then(() => WowToken.create({ price: 3050000000, last_updated_timestamp: Date.now() }))
            .then(() => {
                return logic.retrieveWowTokenData()
                    .then((wowToken) => {
                        expect(wowToken.price).to.equal(3050000000)
                        expect(wowToken.last_updated_timestamp).to.be.a('number')
                    })
            })
    })

    after(() => mongoose.disconnect())
})