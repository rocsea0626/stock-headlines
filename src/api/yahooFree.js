import axios from 'axios';
import { API } from './constants';
import { data as quotes } from '../data/mock/quotes'
import { charts } from '../data/mock/charts'

export function fetchQuotes(symbols) {
    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej) => {
            console.log('fetchQuotes(), use local mock data')
            const result = {
                data: {
                    quoteResponse: {
                        result: quotes.filter((q)=>{
                            return symbols.indexOf(q.symbol)>=0
                        }),
                        error: null
                    }
                }
            }
            setTimeout(() => res(result), 500)
        })
    }
    return axios.get(
        API.yahooFree.resources.quotes.url, {
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
        return new Promise((res, rej) => {
            console.log('fetchChart(' + symbol + '), use local mock data')
            setTimeout(() => res(charts[symbol]), 500)
        })
    }

    return axios.get(
        API.yahooFree.resources.chart.url + symbol, {
            params: {
                "region": API.yahooFree.region,
                "lang": API.yahooFree.lang,
                "interval": interval,
                "range": range
            },
            headers: API.yahooFree.headers
        }
    )
}

/**
 * Parse response of chart/ endpoint from YahooFree Api 
 * 
 * @param {object} res - response from YahooFree Api 
 * @return {object} payload - in format {timestamps, quotes}
 */
export function parseChartResponse(res) {
    const result = []
    res.data.chart.result[0].timestamp.forEach((ts, idx) => {
        result.push({
            date: new Date(ts * 1000),
            open: res.data.chart.result[0].indicators.quote[0].open[idx],
            high: res.data.chart.result[0].indicators.quote[0].high[idx],
            low: res.data.chart.result[0].indicators.quote[0].low[idx],
            close: res.data.chart.result[0].indicators.quote[0].close[idx],
            volume: res.data.chart.result[0].indicators.quote[0].volume[idx],
        })
    })
    return result
}

export function parseChartQuotes(res) {
    const result = {}
    res.data.quoteResponse.result.forEach((r, idx) => {
        result[r.symbol] = r
    })
    return result
}