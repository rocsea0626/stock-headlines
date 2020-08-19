import * as actionTypes from '../constants/actionTypes'


const initialState = {
    loading: false,
    selectedTimeStamp: 0,
    timestamps: [],
    data: {},
    quotes: [],
    error: undefined
}

function chartReducer(state = initialState, action) {
    console.log(action.type)
    switch (action.type) {
        case actionTypes.FETCH_CHART_START:
            return Object.assign({}, state, {
                // timestamps: [],
                // quotes: [],
                loading: true,
                selectedTimeStamp: 0,
                data: {},
                error: undefined
            })
        case actionTypes.FETCH_CHART_COMPLETED:
            return Object.assign({}, state, {
                // timestamps: action.payload.timestamps,
                // quotes: action.payload.quotes,
                selectedTimeStamp: 0,
                data: action.payload,
                loading: false,
                error: undefined
            })
        case actionTypes.FETCH_CHART_ERROR:
            console.log(action)
            return Object.assign({}, state, {
                // timestamps: [],
                // quotes: [],
                data: {},
                loading: false,
                selectedTimeStamp: 0,
                error: action.payload
            })
        case actionTypes.SELECT_SYMBOL:
            return Object.assign({}, state, {
                selectedTimeStamp: action.payload.timestamp,
            })
        default:
            break
    }
    return state;
}

export default chartReducer