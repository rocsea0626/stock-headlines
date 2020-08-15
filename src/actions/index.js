import * as actionTypes from '../constants/actionTypes'
import { AWS, Yahoo } from '../api'

const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload ? payload : null
    }
}

export const fetchSymbols = (dispatch) => {
    dispatch(createAction(actionTypes.FETCH_SYMBOLS_START))
    AWS.fetchSymbols()
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
            symbols = await AWS.fetchSymbols()
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_COMPLETED, symbols))
        } catch (e) {
            dispatch(createAction(actionTypes.FETCH_SYMBOLS_ERROR, e))
        }
        try {
            dispatch(createAction(actionTypes.FETCH_QUOTES_START))
            const res = await Yahoo.fetchQuotes(symbols)
            dispatch(createAction(actionTypes.FETCH_QUOTES_COMPLETED, res.data.quoteResponse.result))
        } catch (e) {
            dispatch(createAction(actionTypes.FETCH_QUOTES_ERROR, e))
        }
    }
}

export const fetchChart = (symbol, interval, range) => {
    console.log(`fetchChart(${symbol}, ${interval}, ${range})`)
    return async function (dispatch) {
        dispatch(createAction(actionTypes.FETCH_CHART_START))
        try {
            const res = await Yahoo.fetchChart(symbol, interval, range)
            if(res.data.chart.error){
                // console.log(res.data.chart.error)
                throw new Error(res.data.chart.error.code, res.data.chart.error.description)
            }
            const payload = {
                timestamps: res.data.chart.result[0].timestamp,
                quotes: res.data.chart.result[0].indicators.quote[0].close,
            }
            dispatch(createAction(actionTypes.FETCH_CHART_COMPLETED, payload))
        } catch (e) {
            dispatch(createAction(actionTypes.FETCH_CHART_ERROR, e))
        }
    }
}

export const fetchRssFeeds = (symbol, timestamp) => {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.FETCH_RSSFEEDS_START))
        try {
            const res = await AWS.fetchFeeds(symbol, timestamp)
            console.log(res)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_COMPLETED, res.data.text.Items))
        } catch (e) {
            console.err(e)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_ERROR, e))
        }
    }
}

export const selectSymbol = (symbol, timestamp) => {
    return async function (dispatch) {
        dispatch(createAction(actionTypes.SELECT_SYMBOL, { symbol, timestamp }))
        dispatch(createAction(actionTypes.FETCH_RSSFEEDS_START))
        try {
            const res = await AWS.fetchFeeds(symbol, timestamp)
            console.log(res)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_COMPLETED, res.data.text.Items))
        } catch (e) {
            console.log(e)
            dispatch(createAction(actionTypes.FETCH_RSSFEEDS_ERROR, e))
        }

    }

}