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
    if (!service || !service.name) {
        return '#e0e0e0'
    }

    const cheapestName = service.name

    switch (cheapestName) {
        case 'Nova':
            return '#F19001'
        case 'Dawn':
            return '#EB4E49'
        case 'Sylvanas':
            return '#4B4B4B'
        case 'Oblivion':
            return '#036FA9'
        default:
            return '#e0e0e0'
    }
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
    sortProvidersByServicePrice,
};
export default util;
