import * as actionTypes from './actionTypes'
import axios from 'axios'
const API_KEY = 'AIzaSyDdA3fGVwJ9GFspbK_uOOAY4t6pJllkBpE'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ({ localId: userId, idToken }) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        idToken
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = authData => {
    authData.returnSecureToken = true
    return async (dispatch) => {
        dispatch(authStart())
        try {
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData)
            console.log('res : ', res.data);
            dispatch(authSuccess(res.data))

        } catch (err) {
            console.log('err : ', err);
            dispatch(authFail(err))
        }
    }
}