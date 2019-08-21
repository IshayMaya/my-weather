/* eslint-disable import/first */

const API_KEY = 'CIqHWgxAnuE2qFgvJs2bJwVSZG3hRGGk'
import favoriteService from './favoriteService'
import * as axios  from './axiosService'

const getCityNames = async (name) => {
    let response = await axios.weatherAxios.get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${name}`)
    return response.data
}

const getForecastByCity = async (cityDetails) => {
    if (!cityDetails) cityDetails = await _getDefaultCity()
    let city = cityDetails.city || cityDetails.LocalizedName
    let country = cityDetails.country || cityDetails.Country.LocalizedName
    let {Key} = cityDetails
    let forecast = await getFiveDayForecast(Key)
    forecast.location = { city, Key, country }
    let favorites = await favoriteService.getFavorites()
    forecast.location.isOnFavorites = Object.values(favorites).some(fav => fav.Key == forecast.location.Key)
    forecast.currentConditions = await getCurrentConditions(Key)
    return forecast
}

const getFiveDayForecast = async (cityKey) => {
    let response = await axios.weatherAxios.get(`forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`)
    return response.data
}

const getCurrentConditions = async (cityKey) => {
    let response = await axios.weatherAxios.get(`currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
    return response.data[0]
}

const _getDefaultCity = async() => {
    let response = await axios.dbAxios.get(`default.json`)
    return response.data.location
}

export default {
    getForecastByCity,
    getCityNames
}