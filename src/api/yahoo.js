import axios from 'axios';
import { API } from './constants';
import {result} from '../data/mock/quotes'
import {charts} from '../data/mock/charts'



export function fetchQuotes(symbols) {
    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej)=>{
            console.log('fetchQuotes(), use local mock data')
            setTimeout(() => res(result), 500)
        })
    }
    return axios.get(
        API.yahooFree.resources.quotes.url,
        {
            params: {
                "region": API.yahooFree.region,
                "lang": API.yahooFree.lang,
                "symbols": symbols.reduce((acc, s) => {
                    return acc + s + ','
                }, '')
            },
            headers: API.yahooFree.headers
        }
    )
}


export function fetchChart(symbol, interval = API.yahooFree.resources.chart.interval, range = API.yahooFree.resources.chart.range) {

    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej)=>{
            console.log('fetchChart('+symbol+'), use local mock data')
            setTimeout(() => res(charts[symbol]), 500)
        })
    }

    return axios.get(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts",
        {
            params: {
                "region": API.yahoo.region,
                "lang": API.yahoo.lang,
                "symbol": symbol,
                "interval": interval,
                "range": range
            },
            headers: API.yahoo.headers
        }
    )
}

/**
 * Parse response of chart/ endpoint from Yahoo Api 
 * 
 * @param {object} res - response from Yahoo Api 
 * @return {object} payload - in format {timestamps, quotes}
 */
export function parseChartResponse(res) {
    return {
        timestamps: res.data.chart.result[0].timestamp,
        quotes: res.data.chart.result[0].indicators.quote[0].close,
    }
}

export function parseChartQuotes(res) {
    const result = {}
    res.data.quoteResponse.result.forEach((r, idx) => {
        result[r.symbol] = r
    })
    return result
}