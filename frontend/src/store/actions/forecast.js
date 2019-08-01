import * as actionTypes from './actionTypes'
import weatherService from '../../service/weatherService'

export const setForecast = (forecast) => {
    return {
        type: actionTypes.SET_FORECAST,
        forecast
    }
}
export const getFiveDayForecast = (cityName) => {
    return async(dispatch) => {
        let res = await weatherService.getForecastByCity(cityName)
        console.log('res  : ',res);
        dispatch(setForecast(res))
    }
}