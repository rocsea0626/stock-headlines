import axios from 'axios';
import { API } from './constants'
import {symbols} from '../data/mock/symbols'

export function fetchFeeds(symbol, timestamp) {

    const relativePath = 'rssfeeds'

    return axios.get(
        API.aws.baseUrl + relativePath,
        {
            params: {
                "symbol": symbol,
                "timestamp": timestamp
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export function fetchSymbols() {

    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej)=>{
            setTimeout(() => res(symbols), 500);
        })
    }

    const relativePath = 'symbols'

    return axios.get(API.aws.baseUrl + relativePath)
}


export function addSymbol(symbol) {

    if (process.env.REACT_APP_DATE_SOURCE === 'local') {
        return new Promise((res, rej)=>{
            setTimeout(() => res(symbols.push(symbol)), 500);
        })
    }
    const relativePath = 'symbols'

    return axios.post(
        API.aws.baseUrl + relativePath,
        {
            "symbol": symbol
        }
    )
}