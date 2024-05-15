import { validate, errors } from 'com'

import { WowToken, WowTokenType } from '../data/index.ts'

const { SystemError } = errors

function retrieveWowTokenData(): Promise<WowTokenType> {
    return WowToken.findOne({}).select('-__v').lean().exec()
        .catch((error) => { throw new SystemError(error.message) })
        .then((wowToken) => {
            const wowTokenFormatted = {
                price: wowToken.price,
                last_updated_timestamp: wowToken.last_updated_timestamp
            }
            return wowTokenFormatted
        })
}

export default retrieveWowTokenData
