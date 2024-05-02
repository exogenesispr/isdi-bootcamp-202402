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

export default getCheapestCommunity