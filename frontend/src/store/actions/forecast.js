import * as actionTypes from './actionTypes'
import weatherService from '../../service/weatherService'

export const setForecast = forecast => {
    return {
        type: actionTypes.SET_FORECAST,
        forecast
    }
}

export const toggleForecastSpinner = (isLoading) => {
    return {
        type: actionTypes.TOGGLE_FORECAST_SPINNER,
        isLoading
    }

}

export const handleError = () => {
    return {
        type:actionTypes.HANDLE_ERROR
    }
}

export const closeErrorModal = () => {
    return {
        type:actionTypes.CLOSE_ERROR_MODAL
    }
}

export const getFiveDayForecast = cityDetails => {
    return async(dispatch) => {
        dispatch(toggleForecastSpinner(true))
        try { 
            let forecast = await weatherService.getForecastByCity(cityDetails)
            dispatch(toggleForecastSpinner(false))
            dispatch(setForecast(forecast))
        } catch (err) {
            dispatch(handleError())
        }
    }
}

export const getCityNames = cityName => {
    return async(dispatch) => {
        try {
            let cityNameList = await weatherService.getCityNames(cityName)
            if (cityNameList.length === 1) dispatch(getFiveDayForecast(cityNameList[0]))
            else return cityNameList
        } catch (defaultWeather) {
            dispatch(handleError()) 
        }
    }
}