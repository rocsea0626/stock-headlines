import axios from 'axios';
import { API } from './constants';
import {result} from '../data/mock/quotes'



export function fetchQuotes(symbols) {
    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej)=>{
            console.log('use local mock data')
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


export function fetchChart(symbol, interval = API.yahoo.interval, range = API.yahoo.range) {

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

