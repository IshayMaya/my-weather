import * as actions from '../actions/actionTypes'
import {updateObject} from '../../service/utilService'

const initialState = {
    fiveDayForecast: null,
    currentConditions: null,
    currentLocation: null,
    isLoadingForecast: false,
    isError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_FORECAST:
            let { forecast } = action
            return updateObject(state, {
                fiveDayForecast: forecast.DailyForecasts,
                currentLocation: forecast.location,
                currentConditions: forecast.currentConditions
            })

        case actions.TOGGLE_FORECAST_SPINNER:
            let { isLoading } = action
            return updateObject(state, { isLoadingForecast: isLoading })

        case actions.UPDATE_FAVORITE_LOCATION:
            let { updatedLocation } = action
            if (!updatedLocation) return updateObject(state, {
                currentLocation: {
                    ...state.currentLocation,
                    isOnFavorites: !state.currentLocation.isOnFavorites
                }
            })
            return updateObject(state,{currentLocation: updatedLocation})

        case actions.HANDLE_ERROR:
            return {
                ...state,
                isError: true
            }
        case actions.CLOSE_ERROR_MODAL:
            return updateObject(state,{isError: false})
                
    }
    return state;
};

export default reducer;