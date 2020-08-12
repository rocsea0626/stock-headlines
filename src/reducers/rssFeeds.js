import * as actionTypes from '../constants/actionTypes'


const initialState = {
    loading: false,
    feeds: {}
}

function rssFeedsReducer(state = initialState, action) {
    const { type } = action
    return state;
}

export default rssFeedsReducer