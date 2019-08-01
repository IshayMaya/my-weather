import axios from 'axios'
const API_KEY = 'CIqHWgxAnuE2qFgvJs2bJwVSZG3hRGGk'


const addToFavorites = async (city, conditions) => {
    let id = _createId()
    const location = { id, city, conditions }
    try {
        const res = await axios.post('https://my-weather-65d57.firebaseio.com/favorites.json', location)

    } catch (err) {
        console.log(err)
    }
}

const getFavorites = async () => {
    let response = await axios.get('https://my-weather-65d57.firebaseio.com/favorites.json')
    return Object.values(response.data)
}
const getForecastByCity = async (name) => {
    let forecast = JSON.parse(localStorage.getItem('weather'))
    return Promise.resolve(forecast)
}
const getForecastByCityFromApi = async (name) => {
    let response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${name}`)
    let { LocalizedName: location } = response.data[0]
    let { Key } = response.data[0]
    let forecast = await getFiveDayForecast(Key)
    forecast.location = location
    forecast.currentConditions = await getCurrentConditions(Key)
    localStorage.setItem('weather', JSON.stringify(forecast))
    return forecast

}

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
    getFavorites
}