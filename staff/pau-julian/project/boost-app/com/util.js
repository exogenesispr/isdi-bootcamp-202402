import { decode } from 'base-64'

function extractJwtPayload(token) {
    const [, payloadB64] = token.split('.');
    const payloadJSON = decode(payloadB64);
    const payload = JSON.parse(payloadJSON);
    return payload;
}

function getCheapestCommunity(communities, service) {
    if (!communities || communities.length === 0) return null

    return communities.reduce((cheapest, community) => {
        const communityPrice = community.price[service].value
        const cheapestPrice = cheapest ? cheapest.price[service].value : Infinity

        if (communityPrice < cheapestPrice)
            return community

        return cheapest
    }, null)
}

function getBackgroundColor(service) {
    const cheapestName = service.name

    switch (cheapestName) {
        case 'Nova':
            // return '#F19001'
            return '#f6b556'
        case 'Dawn':
            // return '#EB4E49'
            return '#f28986'
        case 'Sylvanas':
            // return '#4B4B4B'
            return '#696969'
        case 'Oblivion':
            // return '#036FA9'
            return '#579fc6'
        default:
            return '#C7AD95'
    }
}

function getServiceImage(service) {
    if (!service || !service.name) {
        return require('../assets/icons/useravataricon.png')
    }

    switch (service.name) {
        case 'Nova':
            return require('../assets/icons/novalogopau.png')
        case 'Dawn':
            return require('../assets/icons/dawnlogopau.png')
        case 'Sylvanas':
            return require('../assets/icons/sylvanaslogopau.png')
        case 'Oblivion':
            return require('../assets/icons/oblivionlogopau.png')
        case 'default':
            return require('../assets/icons/useravataricon.png')
    }
}

function formatServiceName(serviceType) {
    if (serviceType === 'm10')
        return 'Mythic 10'
    else if (serviceType === 'raidVip')
        return 'Raid Vip'
    else if (serviceType === 'raidUnsaved')
        return 'Raid Unsaved'
    else if (serviceType === 'raidSaved')
        return 'Raid Saved'
}

function priceFormatter(value, isToken = false) {
    if (!isToken) {
        if (value < 1000) {
            return value.toString()
        } else if (value < 1000000) {
            return Math.floor(value / 1000) + 'k'
        } else {
            return (value / 1000000).toFixed(2) + 'M'
        }
    }
    return (value / 10000000).toFixed(1) + 'k'
}

function sortProvidersByServicePrice(providers, serviceType) {
    return providers.sort((a, b) => a.price[serviceType].value - b.price[serviceType].value)
}

const util = {
    extractJwtPayload,
    getCheapestCommunity,
    getBackgroundColor,
    priceFormatter,
    getServiceImage,
    formatServiceName,
    sortProvidersByServicePrice,
};
export default util;
