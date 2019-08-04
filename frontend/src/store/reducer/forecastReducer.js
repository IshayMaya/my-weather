import * as actions from '../actions/actionTypes'
import weatherService from '../../service/weatherService'

const initialState = {
    fiveDayForecast: null,
    currentConditions: null,
    currentLocation: null,
    favoriteList: null,
    isLoadingForecast: false,
    isError:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_FORECAST:
            let { forecast } = action
            return {
                ...state,
                fiveDayForecast: forecast.DailyForecasts,
                currentLocation: forecast.location,
                currentConditions: forecast.currentConditions
            }
        case actions.TOGGLE_FORECAST_SPINNER:
            let { isLoading } = action
            return {
                ...state,
                isLoadingForecast: isLoading
            }
        case actions.SET_FAVORITES:
            let { favorites } = action
            return {
                ...state,
                favoriteList: favorites
            }
        case actions.CLEAR_FAVORITES:
            return {
                ...state,
                favoriteList: null
            }
        case actions.UPDATE_FAVORITE_LOCATION:
            let { updatedLocation } = action
            if (!updatedLocation) return {
                ...state,
                currentLocation: {
                    ...state.currentLocation,
                    isOnFavorites: !state.currentLocation.isOnFavorites
                }
            }
            return {
                ...state,
                currentLocation: updatedLocation
            }
        case actions.HANDLE_ERROR:
            return {
                ...state,
                isError:true
            }
        case actions.CLOSE_ERROR_MODAL:
            return {
                ...state,
                isError:false
            }

    }
    return state;
};

export default reducer;