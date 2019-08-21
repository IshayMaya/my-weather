import * as actions from '../actions/actionTypes'
import { updateObject } from '../../service/utilService'


const initialState = {
    favoriteList: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_FAVORITES:
            let { favorites } = action
            return updateObject(state, { favoriteList: favorites })
        case actions.CLEAR_FAVORITES:
            return updateObject(state, { favoriteList: null })
    }
    return state;
};

export default reducer;