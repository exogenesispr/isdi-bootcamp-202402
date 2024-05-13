import { validate, errors } from 'com'

const { ExpirationError, SystemError } = errors

export default function fetchWowTokenData() {
    return fetch('https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu', {
        headers: {
            'Authorization': `Bearer ${process.env.BLIZZARD_TOKEN}`
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }

            if (res.status === 400) {
                throw new ExpirationError('Token expired')
            }
            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch((error) => { throw new SystemError(error.message) })
}