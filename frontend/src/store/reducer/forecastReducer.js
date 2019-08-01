import * as actions from '../actions/actionTypes'
import weatherService from '../../service/weatherService'

const initialState = {
    fiveDayForecast: null,
    currentConditions: null,
    currentLocation: null,
    favoriteList:null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_FORECAST:
            let { forecast } = action
            return {
                ...initialState,
                fiveDayForecast: forecast.DailyForecasts,
                currentLocation: forecast.location,
                currentConditions: forecast.currentConditions
            }
        case actions.SET_FAVORITES:
            let { favorites } = action
            return {
                ...initialState,
                favoriteList:favorites
            }

    }
    return state;
};

export default reducer;