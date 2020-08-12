import * as actionTypes from '../constants/actionTypes'

const initialState = {
    loading: false,
    quotes: []
}

function quotesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SYMBOLS_START:
            return Object.assign({}, state, {
                quotes: [],
                loading: true
            })
        case actionTypes.FETCH_QUOTES_START:
            return Object.assign({}, state, {
                quotes: [],
                loading: true
            })
        case actionTypes.FETCH_SYMBOLS_COMPLETED:
            break
        case actionTypes.FETCH_QUOTES_COMPLETED:
            return Object.assign({}, state, {
                loading: false,
                quotes: action.payload
            })
        case actionTypes.FETCH_SYMBOLS_ERROR:
            state.loading = false
            return Object.assign({}, {
                quotes: []
            })
        case actionTypes.FETCH_QUOTES_ERROR:
            state.loading = false
            return Object.assign({}, {
                quotes: []
            })
        default:
            state.loading = false
            break
    }
    return state;
}

export default quotesReducer