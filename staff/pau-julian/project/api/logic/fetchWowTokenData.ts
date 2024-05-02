import dotenv from 'dotenv'
import { validate, errors } from 'com'
import { jwtDecode } from 'jwt-decode'

const { SystemError, ExpirationError } = errors

dotenv.config()

function fetchWowTokenData() {
    validate.text(process.env.BLIZZARD_TOKEN, 'Blizzard Token', true)

    let wowToken

    return fetch('https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu', {
        headers: {
            'Authorization': `Bearer ${process.env.BLIZZARD_TOKEN}`
        }
    })
        .then((res) => {
            wowToken = res.json()

            if (res.status === 200) {
                return wowToken
            }

            if (res.status === 400) {
                throw new ExpirationError('Token expired')
            }
            //TEST WITH EXPIRED TOKEN!!!

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch((error) => { throw new SystemError(error.message) })
}

export default fetchWowTokenData

// const jwtToken = `${process.env.BLIZZARD_CLIENT_ID}.${process.env.BLIZZARD_TOKEN}.${process.env.BLIZZARD_CLIENT_SECRET}`
// const decoded = jwtDecode(jwtToken)

// const expiration = new Date(decoded['blizzard-token-expires'])

// if (expiration.getTime() < Date.now()) {
//     throw new ExpirationError('Blizzard token expired')
// }