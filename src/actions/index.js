import * as actionTypes from '../constants/actionTypes'
import * as api from '../api'

const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload ? payload : null
    }
}

export const fetchSymbols = (dispatch) => {
    dispatch(createAction(actionTypes.FETCH_SYMBOLS_START))
    api.fetchSymbols()
        .then((symbols) => {
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_COMPLETED, symbols))
        })
        .catch((err) => {
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_ERROR, err))
        })
}

export const fetchQuotes = () => {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.FETCH_SYMBOLS_START))
        let symbols
        try {
            symbols = await api.fetchSymbols()
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_COMPLETED, symbols))
        } catch (e) {
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_ERROR, e))
        }
        try {
            const apiName = api.NAME.YahooFree
            dispatch(createAction(actionTypes.FETCH_QUOTES_START))
            const res = await api.fetchQuotes(apiName,symbols)
            const payload = api.parseResponseQuotes(apiName, res)
            // console.log(payload)
            dispatch(createAction(actionTypes.FETCH_QUOTES_COMPLETED, payload))
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.FETCH_QUOTES_ERROR, e))
        }
    }
}

export const fetchChart = (symbol, interval, range) => {
    console.log(`fetchChart(${symbol}, ${interval}, ${range})`)
    return async function (dispatch) {
        dispatch(createAction(actionTypes.FETCH_CHART_START))
        const apiName = api.NAME.YahooFree
        try {
            const res = await api.fetchChart(apiName, symbol, interval, range)
            if(res.data.chart.error){
                // console.log(res.data.chart.error)
                throw new Error(res.data.chart.error.code, res.data.chart.error.description)
            }
            const payload = api.parseResponseChart(apiName, res)
            // console.log(payload)
            dispatch(createAction(actionTypes.FETCH_CHART_COMPLETED, payload))
        } catch (e) {
            dispatch(createAction(actionTypes.FETCH_CHART_ERROR, e))
        }
    }
}

export const selectSymbol = (symbol, timestamp) => {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.SELECT_SYMBOL, { symbol, timestamp }))
        dispatch(createAction(actionTypes.FETCH_RSSFEEDS_START))
        try {
            const res = await api.fetchFeeds(symbol, timestamp)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_COMPLETED, res.data.text.Items[0]))
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_ERROR, e))
        }

    }

}

export function addSymbol(symbol) {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.ADD_SYMBOL_START))
        try {
            const res = await api.addSymbol(symbol)
            dispatch(createAction(actionTypes.ADD_SYMBOL_COMPLETED, res.data.symbols))
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.ADD_SYMBOL_ERROR, e))
        }

    }
}