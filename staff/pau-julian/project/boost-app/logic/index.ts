import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import modifyUser from './modifyUser'
import modifyUserPrice from './modifyUserPrice'
import modifyUserOnlineStatus from './modifyUserOnlineStatus'
import deleteUser from './deleteUser'
import getProviderById from './getProviderById'

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
    modifyUserPrice,
    modifyUserOnlineStatus,
    deleteUser,

    retrieveUsersByStatus,
    retrieveCommunities,
    retrieveWowTokenData,
    getProviderById,

    getLoggedInUserId,
    isUserLoggedIn,
}

export default logic