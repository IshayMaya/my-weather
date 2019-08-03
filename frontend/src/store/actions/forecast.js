import * as actionTypes from './actionTypes'
import weatherService from '../../service/weatherService'

export const setForecast = forecast => {
    return {
        type: actionTypes.SET_FORECAST,
        forecast
    }
}
export const getFiveDayForecast = cityDetails => {
    return async(dispatch) => {
        let forecast = await weatherService.getForecastByCity(cityDetails)
        // let res = await weatherService.getForecastByCity(cityName)
        dispatch(setForecast(forecast))
    }
}

export const getCityNames = cityName => {
    return async(dispatch) => {
        let cityNameList = await weatherService.getCityNames(cityName)
        if (cityNameList.length === 1) dispatch(getFiveDayForecast(cityNameList[0]))
        else return cityNameList
    }

}