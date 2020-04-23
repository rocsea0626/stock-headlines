import axios from 'axios';
import { API } from './constants';



export function fetchQuotes(symbols) {

    const axios = require('axios');

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
            headers: {
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": "45a94b3954msh28833e1f7fe08c9p1ef075jsn9f89609f22e6"
            }
        }
    )
}

