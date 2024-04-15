import mongoose, { Schema, mongo } from 'mongoose'

const { Types: { ObjectId } } = mongoose

import { UserType, User } from '../data/index.ts'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

function retrieveUser(userId: string, targetedUserId: string): Promise<{ name: string, username: string }> {
    validate.text(userId, 'userId', true)
    validate.text(targetedUserId, 'targetedUserId', true)

    return User.findById(userId)
        .catch((error) => { throw new SystemError(error.message) })
        .then((user) => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetedUserId).select('-_id name username').lean()
        })
        .then((user) => {
            if (!user) throw new NotFoundError('target user not found')

            return { name: user.name, username: user.username }
        })
}

export default retrieveUser