function getBackgroundColor(cheapest) {
    const cheapestName = cheapest.name

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

export default getBackgroundColor