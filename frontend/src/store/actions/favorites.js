import * as actionTypes from './actionTypes'
import favoriteService from '../../service/favoriteService'


// Action creators :

export const updateFavoriteLocation = updatedLocation => {
    return {
        type: actionTypes.UPDATE_FAVORITE_LOCATION,
        updatedLocation
    }
}

export const setFavorites = (favorites) => {
    return {
        type: actionTypes.SET_FAVORITES,
        favorites
    }
}

export const clearFavorites = () => {
    return {
        type: actionTypes.CLEAR_FAVORITES
    }
}

// Actions :

export const addToFavorites = () => {
    return async (dispatch, getState) => {
        let location = getState().forecast.currentLocation
        let conditions = getState().forecast.currentConditions
        dispatch(updateFavoriteLocation())
        let updatedLocation = await favoriteService.toggleLocationFromFavorites(location, conditions)
        dispatch(updateFavoriteLocation(updatedLocation))
    }
}

export const loadFavorites = () => {
    return async (dispatch) => {
        let favorites = await favoriteService.getFavorites()
        dispatch(setFavorites(favorites))
    }
}

