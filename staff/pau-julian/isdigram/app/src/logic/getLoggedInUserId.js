function getLoggedInUserId() {
    const [, payloadB64] = sessionStorage.token.spli('.')

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    return userId
}

export default getLoggedInUserId