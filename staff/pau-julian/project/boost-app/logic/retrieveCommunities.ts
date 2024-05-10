import { errors } from '../com/index.js'


function retrieveCommunities() {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/eu/communities`)
        .then((res) => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then((body) => {
                    const { error, message } = body
                    const constructor = errors[error] || Error
                    throw new constructor(message)
                })
        })
}

export default retrieveCommunities