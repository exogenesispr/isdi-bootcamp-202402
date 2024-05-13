import { validate, errors } from 'com'

import { UserType, User, Language } from '../data/index.ts'

const { SystemError } = errors

function retrieveUsersByStatus(): Promise<UserType[]> {
    return User.find({ online: true }).select('-__v').lean().exec()
        .catch((error) => { throw new SystemError(error.message) })
        .then((users: UserType[]) => {
            const usersWithId = users.map((user) => {
                return {
                    //@ts-ignore
                    id: user._id.toString(),
                    username: user.username,
                    dcName: user.dcName,
                    language: user.language,
                    online: user.online,
                    price: user.price
                }
            })

            return usersWithId
        })
}

export default retrieveUsersByStatus

// Promise<[{ username: string, dcName: string, language: Language[], online: true, price?}] | { username: string, dcName: string, language: Language[], online: true, price?}[]> 