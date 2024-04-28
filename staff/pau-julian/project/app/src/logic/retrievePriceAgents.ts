import { validate, errors } from 'com'

function retrievePriceAgents() {
    let users
    let communities

    let priceAgents = []
    return fetch(`${import.meta.env.VITE_API_URL}/eu/users/status/:online`)
        .then((res) => {
            if (res.status === 200)
                users = res.json()

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

    return fetch(`${import.meta.env.VITE_API_URL}/eu/communities`)
        .then((res) => {
            if (res.status === 200)
                communities = res.json()

            return res.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}