import * as Rss from './rss/msn'
import * as AWS from './aws'
import * as Yahoo from './yahoo'
import * as YahooFree from './yahooFree'
import { API } from './constants'

const NAME = {
    Yahoo: 'yahoo',
    YahooFree: 'yahooFree',
}


const getInterval = (apiName) => {
    if (apiName === NAME.Yahoo)
        return API.yahoo.resources.chart.interval

    return API.yahooFree.resources.chart.interval
}

const getAllowedIntervals = (apiName) => {
    if (apiName === NAME.Yahoo)
        return API.yahoo.resources.chart.allowed.intervals

    return API.yahooFree.resources.chart.allowed.intervals
}

const getRange = (apiName) => {
    if (apiName === NAME.Yahoo)
        return API.yahoo.resources.chart.range

    return API.yahooFree.resources.chart.range
}

const getAllowedRanges = (apiName) => {
    if (apiName === NAME.Yahoo)
        return API.yahoo.resources.chart.allowed.range

    return API.yahooFree.resources.chart.allowed.range
}

const fetchSymbols = () => {
    return AWS.fetchSymbols()
}

const fetchQuotes = (apiName, symbols) => {
    if (apiName === NAME.Yahoo)
        return Yahoo.fetchQuotes(symbols)

    return YahooFree.fetchQuotes(symbols)
}

const fetchChart = (apiName, symbol, interval, range) => {
    if (apiName === NAME.Yahoo)
        return Yahoo.fetchChart(symbol, interval, range)

    return YahooFree.fetchChart(symbol, interval, range)
}

const parseResponseChart = (apiName, res) => {
    if (apiName === NAME.Yahoo)
        return Yahoo.parseChartResponse(res)

    return YahooFree.parseChartResponse(res)
}

const parseResponseQuotes = (apiName, res) => {
    if (apiName === NAME.Yahoo)
        return Yahoo.parseChartQuotes(res)

    return YahooFree.parseChartQuotes(res)
}

const fetchFeeds = (symbol, timestamp) => {
    return AWS.fetchFeeds(symbol, timestamp)
}

const addSymbol = (symbol) => {
    return AWS.addSymbol(symbol)
}

const removeSymbol = (symbol) => {
    return AWS.removeSymbol(symbol)
}


export {
    NAME,
    Rss,
    fetchSymbols,
    fetchQuotes,
    fetchChart,
    fetchFeeds,
    parseResponseChart,
    parseResponseQuotes,
    addSymbol,
    removeSymbol,
    getInterval,
    getRange,
    getAllowedIntervals,
    getAllowedRanges
}