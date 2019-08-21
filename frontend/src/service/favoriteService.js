import * as axios from './axiosService'


const toggleLocationFromFavorites = async (location, conditions) => {
    location.conditions = conditions
    const favorites = await getFavorites()
    const favoriteLocation = favorites.find(fav => fav.Key == location.Key)
    if (!favoriteLocation) await _addToFavorites(location)
    else await _removeFromFavorites(favoriteLocation)
    location.isOnFavorites = !favoriteLocation
    return location
}

const _removeFromFavorites = async (location) => {
    await axios.dbAxios.delete(`favorites/${location._id}.json`)
    return location
}

const _addToFavorites = async (location) => {
    await axios.dbAxios.post('favorites.json', location)
    return location
}

const getFavorites = async () => {
    let response = await axios.dbAxios.get('favorites.json')
    return Object.entries(response.data).map(e => {
        const [_id, rest] = e
        return { _id, ...rest }
    })
}

export default {
    getFavorites,
    toggleLocationFromFavorites
}
