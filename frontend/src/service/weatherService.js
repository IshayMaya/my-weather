import axios from 'axios'
const API_KEY = 'CIqHWgxAnuE2qFgvJs2bJwVSZG3hRGGk'

const toggleLocationFromFavorites = async ({ Key, city }, conditions) => {
    let  location = { Key, city, conditions }
    const favorites = await getFavorites()
    console.log('favorites : ', favorites);
    console.log('Key :',Key);
    

    const favoriteLocation = favorites.find(fav => fav.Key === Key)
    if (!favoriteLocation)  await addToFavorites(location)
    else await removeFromFavorites(favoriteLocation)
    location.isOnFavorites = !favoriteLocation
    return location
}

const removeFromFavorites = async (location) => {
    console.log('id to remove : ', location._id);

    try {
        await axios.delete(`https://my-weather-65d57.firebaseio.com/favorites/${location._id}.json`)
        return location
    } catch (err) {
        console.log(err)
    }
}

const addToFavorites = async (location) => {
    try {
        await axios.post('https://my-weather-65d57.firebaseio.com/favorites.json', location)
        return location
    } catch (err) {
        console.log(err)
    }
}

const getFavorites = async () => {
    let response
    try {
        response = await axios.get('https://my-weather-65d57.firebaseio.com/favorites.json')
    } catch (err) {
        return []
    }
    if (!response.data) return []
    return Object.values(response.data).map((d, i) => {
        d._id = Object.keys(response.data)[i]
        return d
    })
}

const getForecastByCity = async (name) => {
    let forecast = JSON.parse(localStorage.getItem('weather'))
    let favorites = await getFavorites()
    forecast.location.isOnFavorites = Object.values(favorites).some(fav => fav.Key === forecast.location.Key)
    return Promise.resolve(forecast)
}

const getCityNames = async (name) => {
    let response = JSON.parse(localStorage.getItem('defaultCity'))
    return Promise.resolve(response)
}
// const getCityNames = async (name) => {
//     let response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${name}`)
//     localStorage.setItem('defaultCity',JSON.stringify(response.data))
//     return response.data
// }

// const getForecastByCity = async (cityDetails) => {
//     // let response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${name}`)
//     let { LocalizedName: city,Key } = cityDetails
//     let { LocalizedName: country } = cityDetails.Country
//     let forecast = await getFiveDayForecast(Key)
//     forecast.location = { city, Key, country }
//     let favorites = await getFavorites()
//     forecast.location.isOnFavorites = Object.values(favorites).some(fav => fav.Key === forecast.location.Key)
//     forecast.currentConditions = await getCurrentConditions(Key)
//     localStorage.setItem('weather', JSON.stringify(forecast))
//     return forecast
// }

const getFiveDayForecast = async (cityKey) => {
    let response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`)
    return response.data

}

const getCurrentConditions = async (cityKey) => {
    let response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
    return response.data[0]
}


const _createId = () => {
    let chars = 'abcdefg1234567890'
    return Array.from({ length: 10 }, (_, i) => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('')

}

export default {
    getForecastByCity,
    addToFavorites,
    getFavorites,
    toggleLocationFromFavorites,
    getCityNames
}