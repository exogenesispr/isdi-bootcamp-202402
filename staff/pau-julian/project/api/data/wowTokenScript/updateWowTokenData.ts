import mongoose from 'mongoose'
import { errors } from 'com'
import { WowToken, WowTokenType } from '../index.ts'

const { ExpirationError, SystemError } = errors

import fetchWowTokenData from "./fetchWowTokenData.ts"

export default function updateWowTokenData() {
    return fetchWowTokenData()
        .catch(() => { throw new ExpirationError('Blizzard API token expired') })
        .then((wowToken) => {
            return WowToken.findOneAndUpdate({}, { price: wowToken.price, last_updated_timestamp: wowToken.last_updated_timestamp }, { new: true, upsert: true })
        })
        .then((updatedToken) => {
            console.log('Token data updated succesfully', updatedToken)
        })
        .catch((error) => {
            console.error('Error updating token data:', error)
        })
}