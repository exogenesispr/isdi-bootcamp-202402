import { validate, errors } from 'com'

import { UserType, User } from '../data/index.ts'

const { SystemError } = errors

function retrieveUsersByStatus(): Promise<UserType[]> {
    return User.find({ online: true }).select('-__v -_id').lean().exec()
        .catch((error) => { throw new SystemError(error.message) })
        .then((users: UserType[]) => users)
}

export default retrieveUsersByStatus

// Promise<[{ username: string, dcName: string, language: Language[], online: true, price?}] | { username: string, dcName: string, language: Language[], online: true, price?}[]> 