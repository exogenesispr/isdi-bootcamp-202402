import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import modifyUserOnlineStatus from './modifyUserOnlineStatus.ts'
import modifyUserPrice from './modifyUserPrice.ts'
import modifyUser from './modifyUser.ts'
import deleteUser from './deleteUser.ts'

import retrieveUsersByStatus from './retrieveUsersByStatus.ts'
import retrieveCommunities from './retrieveCommunities.ts'

import getProviderById from './getProviderById.ts'
import retrieveWowTokenData from './retrieveWowTokenData.ts'
import fetchWowTokenData from './fetchWowTokenData.ts'


const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    modifyUserOnlineStatus,
    modifyUserPrice,
    deleteUser,
    retrieveUsersByStatus,
    retrieveCommunities,
    getProviderById,
    retrieveWowTokenData,
    fetchWowTokenData,
}

export default logic