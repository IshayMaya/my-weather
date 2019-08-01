import * as actionTypes from './actionTypes'
import weatherService from '../../service/weatherService'


export const addToFavorites = () => {
    return async (dispatch, getState) => {
        let location = getState().forecast.currentLocation
        let conditions = getState().forecast.currentConditions
        let res = await weatherService.addToFavorites(location, conditions)
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