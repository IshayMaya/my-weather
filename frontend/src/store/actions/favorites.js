import * as actionTypes from './actionTypes'
import weatherService from '../../service/weatherService'


export const updateFavoriteLocation = updatedLocation => {
    return {
        type: actionTypes.UPDATE_FAVORITE_LOCATION,
        updatedLocation
    }
}

export const addToFavorites = () => {
    return async (dispatch, getState) => {
        let location = getState().forecast.currentLocation
        let conditions = getState().forecast.currentConditions
        dispatch(updateFavoriteLocation())
        let updatedLocation = await weatherService.toggleLocationFromFavorites(location, conditions)
        dispatch(updateFavoriteLocation(updatedLocation))
    }
}

export const setFavorites = (favorites) => {
    return {
        type: actionTypes.SET_FAVORITES,
        favorites
    }
}

export const loadFavorites = () => {
    return async (dispatch) => {
        let favorites = await weatherService.getFavorites()
        dispatch(setFavorites(favorites))
    }
}
export const clearFavorites = () => {
    return {
        type: actionTypes.CLEAR_FAVORITES
    }
}