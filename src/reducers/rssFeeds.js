import * as actionTypes from '../constants/actionTypes'


const initialState = {
    loading: false,
    feeds: {},
    error: null
}

function rssFeedsReducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case actionTypes.FETCH_RSSFEEDS_START:
            return Object.assign({}, state, {
                feeds: {},
                loading: true,
                error: null
            })
        case actionTypes.FETCH_RSSFEEDS_COMPLETED:
            return Object.assign({}, state, {
                feeds: {},
                loading: false,
                error: null
            })
        case actionTypes.FETCH_RSSFEEDS_ERROR:
            return Object.assign({}, state, {
                feeds: {},
                loading: false,
                error: action.payload
            })
        default:
            break
    }
    return state;
}

export default rssFeedsReducer