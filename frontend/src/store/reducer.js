import actions from './actions/actions'

const initialState = {
    fiveDayForecast:[]
}

const reducer = (state = initialState, action) => {
    let { value } = action
    switch (action.type) {
       

    }
    return state;
};

export default reducer;