import registerUser from "./registerUser"
import loginUser from "./loginUser"
import retrieveUser from "./retrieveUser"
import logoutUser from "./logoutUser"

import createPost from "./createPost"
import retrievePosts from "./retrievePosts"
import removePost from "./removePost"
import modifyPost from "./modifyPost"


const logic = {
    users: null,
    posts: null,

    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost,
}

export default logic