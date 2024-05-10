import { Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import logic from '../logic'
import { util } from '../com/index.js'

export default function useCommunities() {
    const [communities, setCommunities] = useState([])
    const [cheapest, setCheapest] = useState({
        m10: null,
        raidVip: null,
        raidUnsaved: null,
        raidSaved: null,
    })

    // const fetchData = useCallback(
    const fetchData = () => {

        let isMounted = true

        try {
            logic.retrieveCommunities()
                .then((fetchedCommunities) => {
                    if (isMounted) {
                        setCommunities(fetchedCommunities)

                        const cheapestM10 = util.getCheapestCommunity(fetchedCommunities, 'm10')
                        const cheapestRaidVip = util.getCheapestCommunity(fetchedCommunities, 'raidVip')
                        const cheapestRaidUnsaved = util.getCheapestCommunity(fetchedCommunities, 'raidUnsaved')
                        const cheapestRaidSaved = util.getCheapestCommunity(fetchedCommunities, 'raidSaved')

                        setCheapest({
                            cheapestM10,
                            cheapestRaidVip,
                            cheapestRaidUnsaved,
                            cheapestRaidSaved,
                        })
                    }
                })
                .catch((error) => {
                    Alert.alert('Fetch error:', error)
                })
        } catch (error) {
            Alert.alert('Error fetching data:', error)
        }

        return () => {
            isMounted = false
        }
    }
    // ,[])


    useEffect(() => {
        fetchData()
    }, [])


    return { communities, cheapest }
}