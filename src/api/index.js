import * as Rss from './rss/msn'
import * as AWS from './aws'
import * as Yahoo from './yahoo'
import * as YahooFree from './yahooFree'
import { API } from './constants'

const NAME = {
    Yahoo: 'yahoo',
    YahooFree: 'yahooFree',
}


const getInterval = () => {
    return API.yahooFree.resources.chart.interval
}

const getAllowedIntervals = () => {
    return API.yahooFree.resources.chart.allowed.intervals
}

const getRange = () => {
    return API.yahooFree.resources.chart.range
}

const getAllowedRanges = () => {
    return API.yahooFree.resources.chart.allowed.range
}

const fetchSymbols = () => {
    return AWS.fetchSymbols()
}

const fetchQuotes = (apiName, symbols) => {
    if(apiName === NAME.Yahoo)
        return Yahoo.fetchQuotes(symbols)

    return YahooFree.fetchQuotes(symbols)
}

const fetchChart = (apiName, symbol, interval, range) => {
    if(apiName === NAME.Yahoo)
        return Yahoo.fetchChart(symbol, interval, range)

    return YahooFree.fetchChart(symbol, interval, range)
}

const parseResponseChart = (apiName, res) => {
    if(apiName === NAME.Yahoo)
        return Yahoo.parseChartResponse(res)

    return YahooFree.parseChartResponse(res)
}

const fetchFeeds = (symbol, timestamp) => {
    return AWS.fetchFeeds(symbol, timestamp)
}

export {
    NAME,
    Rss,
    fetchSymbols,
    fetchQuotes,
    fetchChart,
    fetchFeeds,
    parseResponseChart,
    getInterval,
    getRange,
    getAllowedIntervals,
    getAllowedRanges
}