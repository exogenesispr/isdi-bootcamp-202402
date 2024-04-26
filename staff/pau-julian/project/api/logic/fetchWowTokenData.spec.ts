import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User, Language } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

const { SystemError, ExpirationError } = errors

dotenv.config()

describe('fetchWowTokenData', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('fetches blizzard API WoW Token (EU server) information. If token expired: error', () => {
        logic.fetchWowTokenData()
            .then((wowToken) => {
                expect(wowToken.last_updated_timestamp).to.be.a('number')
                expect(wowToken.price).to.be.a('number')
            })
            .catch((error) => {
                expect(error).to.be.instanceOf(ExpirationError)
                expect(error.message).to.equal('Blizzard token expired')
            })

    })

    after(() => mongoose.disconnect())
})