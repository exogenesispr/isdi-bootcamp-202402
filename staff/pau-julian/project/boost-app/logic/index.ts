import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import modifyUser from './modifyUser'
import deleteUser from './deleteUser'

import retrieveUsersByStatus from './retrieveUsersByStatus'
import retrieveCommunities from './retrieveCommunities'
import retrieveWowTokenData from './retrieveWowTokenData'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    modifyUser,
    deleteUser,

    retrieveUsersByStatus,
    retrieveCommunities,
    retrieveWowTokenData,

    getLoggedInUserId,
    isUserLoggedIn,
}

export default logic