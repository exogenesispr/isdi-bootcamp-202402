import { errors } from 'com'
import { Community, CommunityType } from '../data/index.ts'

const { ContentError, SystemError } = errors

function retrieveCommunities(): Promise<CommunityType[]> {
    return Community.find().select('-__v').lean().exec()
        .catch((error) => { throw new SystemError(error.message) })
        .then((communities: CommunityType[]) => {
            if (communities.length !== 4) {
                throw new SystemError('It must contain 4 communities')
            }

            const communityNames = communities.map((community) => community.name)
            const requiredNames = ['Nova', 'Oblivion', 'Dawn', 'Sylvanas']
            const missingNames = requiredNames.filter((name) => !communityNames.includes(name))

            if (missingNames.length > 0) {
                if (missingNames.length === 1) {
                    throw new ContentError(`${missingNames} community is missing`)
                } else {
                    throw new ContentError(`${missingNames.join(', ')} communities are missing`)
                }
            }

            const communitiesWithId = communities.map((community) => {
                return {
                    //@ts-ignore
                    id: community._id.toString(),
                    name: community.name,
                    dcReference: community.dcReference,
                    price: community.price
                }
            })

            return communitiesWithId
        })

}

export default retrieveCommunities