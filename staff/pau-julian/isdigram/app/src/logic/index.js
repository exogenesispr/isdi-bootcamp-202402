import registerUser from './registerUser'
import loginUser from './loginUser'
import registerUser from './registerUser'
import logoutUser from './logoutUser'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isuserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'

import createPost from './createPost'
import retrievePosts from './retrievePosts'
import removePost from './removePost'
import modifyPost from './modifyPost'

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,

    createPost,
    retrievePosts,
    removePost,
    modifyPost,
}

export default logic