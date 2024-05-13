import { validate, errors } from 'com'
import { UserType, User, Community, CommunityType, Language } from '../data/index.ts'

const { NotFoundError, SystemError } = errors

function getProviderById(
    providerId: string
): Promise<UserType | CommunityType> {
    validate.text(providerId, 'providerId', true)

    const userQuery = User.findById(providerId).select('-password -__v').lean()
    const communityQuery = Community.findById(providerId).select('-__v').lean()

    return Promise.all([userQuery, communityQuery])
        .then(([user, community]) => {
            if (community) {
                const communityFormatted = {
                    id: community._id.toString(),
                    name: community.name,
                    dcReference: community.dcReference,
                    price: community.price
                }
                return communityFormatted
            }
            if (user) {
                const userFormatted = {
                    id: user._id.toString(),
                    username: user.username,
                    dcName: user.dcName,
                    online: user.online,
                    language: user.language,
                    price: user.price
                }
                return userFormatted
            }
            throw new NotFoundError('Provider not found')
        })
        .catch((error) => { throw new NotFoundError('Provider not found') })
}

export default getProviderById