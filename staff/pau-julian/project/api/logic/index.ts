import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import modifyUser from './modifyUser.ts'
import retrieveUsersByStatus from './retrieveUsersByStatus.ts'
import retrieveCommunities from './retrieveCommunities.ts'


const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    modifyUser,
    retrieveUsersByStatus,
    retrieveCommunities,
}

export default logic