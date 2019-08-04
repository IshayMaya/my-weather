import axios from 'axios'
const API_KEY = 'CIqHWgxAnuE2qFgvJs2bJwVSZG3hRGGk'

const toggleLocationFromFavorites = async (location, conditions) => {
    location.conditions = conditions 
    const favorites = await getFavorites()
    const favoriteLocation = favorites.find(fav => fav.Key === location.Key)
    if (!favoriteLocation)  await addToFavorites(location)
    else await removeFromFavorites(favoriteLocation)
    location.isOnFavorites = !favoriteLocation
    return location
}

const removeFromFavorites = async (location) => {
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

const getCityNames = async (name) => {
    try {
        let response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${name}`)
        localStorage.setItem('defaultCity',JSON.stringify(response.data))
        return response.data
    } catch (err ){
        console.log(err);
        return JSON.parse(localStorage.getItem('defaultCity'))
    }
   
}

const getForecastByCity = async (cityDetails) => {
    let city = cityDetails.city || cityDetails.LocalizedName
    let country = cityDetails.country || cityDetails.Country.LocalizedName
    let {Key} = cityDetails
    let forecast = await getFiveDayForecast(Key)
    forecast.location = { city, Key, country }
    let favorites = await getFavorites()
    forecast.location.isOnFavorites = Object.values(favorites).some(fav => fav.Key === forecast.location.Key)
    forecast.currentConditions = await getCurrentConditions(Key)
    localStorage.setItem('weather', JSON.stringify(forecast))
    return forecast
}

const getFiveDayForecast = async (cityKey) => {
    try {
        let response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`)
        return response.data
    } catch (err) {
        console.log(err);
        return JSON.parse(localStorage.getItem('weather'))
    }

}

const getCurrentConditions = async (cityKey) => {
    try { 
        let response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
        localStorage.setItem('currentConditions',JSON.stringify(response.data[0]))
        return response.data[0]
    } catch (err) {
        console.log(err)
        return JSON.parse(localStorage.getItem('currentConditions'))
    }
}

export default {
    getForecastByCity,
    addToFavorites,
    getFavorites,
    toggleLocationFromFavorites,
    getCityNames
}