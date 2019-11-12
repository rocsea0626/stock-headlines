import axios from "axios";
import * as mockData from "../data/data";

const API = {
    key: "N1L23RNJ83H9Z4RM",
    baseUrl: "https://www.alphavantage.co/query?",
    example: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo",
}

export function getStockName(stockSymbol, parser) {
    const queryFunction = 'SYMBOL_SEARCH'
    const url = API.baseUrl + `function=${queryFunction}&keywords=${stockSymbol}&apikey=${API.key}`;
    if (parser)
        return axios.get(url).then(parser)
    return axios.get(url)
}

export function getQuotesLatest(stockSymbol, parser) {
    // const queryFunction = 'TIME_SERIES_DAILY'
    const queryFunction = 'GLOBAL_QUOTE'

    const url = API.baseUrl + `function=${queryFunction}&symbol=${stockSymbol}&apikey=${API.key}`;
    // if (parser)
    //     return axios.get(url).then((res) => {
    //         parser(res.data)
    //     })

    return axios.get(url)
}

export function getQuotesDaily(stockSymbol, parser) {
    const queryFunction = 'TIME_SERIES_DAILY'

    const url = API.baseUrl + `function=${queryFunction}&symbol=${stockSymbol}&apikey=${API.key}`;
    if (parser)
        return axios.get(url).then(parser)
    return axios.get(url)
}

export function stockNameParser(data) {
    return data.data.bestMatches[0]["2. name"]
}

export function quotesDailyParser(data) {
    return data.map((d) => {
        // console.log(d["Time Series (Daily)"])
        const quote = {}
        quote.symbol = d["Meta Data"]["2. Symbol"]
        quote.prices = Object.keys(d["Time Series (Daily)"]).map((key) => {
            return {"date": key, "price": d["Time Series (Daily)"][key]["4. close"]}
        })
        return quote
    })
}