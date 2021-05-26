import * as actionTypes from '../constants/actionTypes'
import * as api from '../api'

const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload ? payload : null
    }
}

const fetchSymbols = async (dispatch) => {
    try {
        dispatch(createAction(actionTypes.FETCH_SYMBOLS_START))
        const res = await api.fetchSymbols()
        const symbols = res.data.symbols
        dispatch(createAction(actionTypes.FETCH_SYMBOLS_COMPLETED, symbols))
        return symbols
    } catch (e) {
        dispatch(createAction(actionTypes.FETCH_SYMBOLS_ERROR, e))
    }
}

const fetchQuotes = async (dispatch, symbols) => {
    try {
        const apiName = api.NAME.Yahoo
        dispatch(createAction(actionTypes.FETCH_QUOTES_START))
        const res = await api.fetchQuotes(apiName, symbols)
        const payload = api.parseResponseQuotes(apiName, res)
        dispatch(createAction(actionTypes.FETCH_QUOTES_COMPLETED, payload))
    } catch (e) {
        console.log(e)
        dispatch(createAction(actionTypes.FETCH_QUOTES_ERROR, e))
    }
}

export const fetchSymbolsAndQuotes = () => {
    return async function (dispatch) {
        const symbols = await fetchSymbols(dispatch)
        fetchQuotes(dispatch, symbols)
    }
}

export const fetchChart = (symbol, interval, range) => {
    console.log(`fetchChart(${symbol}, ${interval}, ${range})`)
    return async function (dispatch) {
        dispatch(createAction(actionTypes.FETCH_CHART_START))
        const apiName = api.NAME.Yahoo
        try {
            const res = await api.fetchChart(apiName, symbol, interval, range)
            console.log(res)
            if (res.data.chart.error) {
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
            console.log(res)
            if (res.data.text.Count) {
                dispatch(createAction(actionTypes.FETCH_RSSFEEDS_COMPLETED, res.data.text.Items[0].items))
            } else {
                dispatch(createAction(actionTypes.FETCH_RSSFEEDS_COMPLETED, []))
            }
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
            const symbols = res.data.symbols
            dispatch(createAction(actionTypes.ADD_SYMBOL_COMPLETED, symbols))
            fetchQuotes(dispatch, symbols)
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.ADD_SYMBOL_ERROR, e))
        }

    }
}

export function removeSymbol(symbol) {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.REMOVE_SYMBOL_START))
        try {
            await api.removeSymbol(symbol)
            dispatch(createAction(actionTypes.REMOVE_SYMBOL_COMPLETED, symbol))
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.REMOVE_SYMBOL_ERROR, e))
        }

    }
}