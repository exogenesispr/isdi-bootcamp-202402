import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import modifyUser from './modifyUser.ts'
import deleteUser from './deleteUser.ts'

import retrieveUsersByStatus from './retrieveUsersByStatus.ts'
import retrieveCommunities from './retrieveCommunities.ts'

import fetchWowTokenData from './fetchWowTokenData.ts'


const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    deleteUser,
    retrieveUsersByStatus,
    retrieveCommunities,
    fetchWowTokenData,
}

export default logic