import quotes from './quotes'
import rssFeeds from './rssFeeds'
import chart from './chart'
import { combineReducers } from 'redux'

export default combineReducers({
    quotes,
    rssFeeds,
    chart
})