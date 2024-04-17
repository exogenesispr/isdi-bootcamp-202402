function cleanUpLoggedInUserId() {
    delete sessionStorage.token
}

export default cleanUpLoggedInUserId