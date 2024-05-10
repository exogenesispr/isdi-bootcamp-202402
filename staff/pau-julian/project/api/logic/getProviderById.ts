import { validate, errors } from 'com'
import { UserType, User, Community, CommunityType, Language } from '../data/index.ts'

const { NotFoundError, SystemError } = errors

function getProviderById(
    providerId: string
): Promise<UserType | CommunityType> {
    validate.text(providerId, 'providerId', true)

    const userQuery = User.findById(providerId).select('-password').lean()
    const communityQuery = Community.findById(providerId).lean()

    return Promise.all([userQuery, communityQuery])
        .then(([user, community]) => {
            if (community) {
                return community
            }
            if (user) {
                return user
            }
            throw new NotFoundError('Provider not found')
        })
        .catch((error) => { throw new NotFoundError('Provider not found') })
}

export default getProviderById