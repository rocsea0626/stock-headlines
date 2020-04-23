import axios from 'axios';
import { API } from './constants';



export function fetchQuotes(symbols) {

    return axios.get(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes",
        {
            params: {
                "region": API.yahoo.region,
                "lang": API.yahoo.lang,
                "symbols": symbols.reduce((acc, s)=>{
                    return acc + s + '%2C'
                }, '')
            },
            headers: API.yahoo.headers
        }
    )
}


export function fetchChart(symbol) {

    return axios.get(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts",
        {
            params: {
                "region": API.yahoo.region,
                "lang": API.yahoo.lang,
                "symbol": symbol,
                "interval": API.yahoo.interval,
                "range": API.yahoo.range
            },
            headers: API.yahoo.headers
        }
    )
}

