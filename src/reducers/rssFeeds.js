import * as actionTypes from '../constants/actionTypes'


const initialState = {
    loading: false,
    feeds: [],
    error: undefined
}

function rssFeedsReducer(state = initialState, action) {
    // console.log(action.type)
    switch (action.type) {
        case actionTypes.FETCH_RSSFEEDS_START:
            return Object.assign({}, state, {
                feeds: [],
                loading: true,
                error: undefined
            })
        case actionTypes.FETCH_RSSFEEDS_COMPLETED:
            return Object.assign({}, state, {
                feeds: action.payload,
                loading: false,
                error: undefined
            })
        case actionTypes.FETCH_RSSFEEDS_ERROR:
            return Object.assign({}, state, {
                feeds: [],
                loading: false,
                error: action.payload
            })
        default:
            return state
    }
}

export default rssFeedsReducer