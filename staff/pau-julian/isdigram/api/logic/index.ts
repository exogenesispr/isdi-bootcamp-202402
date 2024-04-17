import registerUser from "./registerUser"
import authenticateUser from "./authenticateUser"
import retrieveUser from "./retrieveUser"
import logoutUser from "./logoutUser"

import createPost from "./createPost"
import retrievePosts from "./retrievePosts"
import removePost from "./removePost"
import modifyPost from "./modifyPost"


const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    logoutUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost,
}

export default logic