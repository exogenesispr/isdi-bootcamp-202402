import { errors } from '../com/index.js'


function retrieveCommunities() {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/eu/communities`, {
        headers: {
            Accept: 'application/json'
        }
    }
    )
        .then((res) => {
            if (res.ok) {
                console.log(res)
                return res.json()
            }
            return res.json()
                .then((body) => {
                    console.log(body)
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default retrieveCommunities