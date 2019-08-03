import * as actions from '../actions/actionTypes'
import weatherService from '../../service/weatherService'

const initialState = {
    fiveDayForecast: null,
    currentConditions: null,
    currentLocation: null,
    favoriteList: null
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
        case actions.SET_FAVORITES:
            let { favorites } = action
            return {
                ...state,
                favoriteList: favorites
            }
        case actions.UPDATE_FAVORITE_LOCATION:
            let { updatedLocation } = action
            console.log('updatedLocation : ',updatedLocation);
            if (!updatedLocation) return {
                ...state,
                currentLocation: { 
                    ...state.currentLocation,
                     isOnFavorites: !state.currentLocation.isOnFavorites
                    } 
                }
            return {
                ...state,
                currentLocation:updatedLocation
            }

    }
    return state;
};

export default reducer;