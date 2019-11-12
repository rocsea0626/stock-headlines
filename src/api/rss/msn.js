import RssParser from "rss-parser";

const rssParser = new RssParser();
const API = {
    baseUrl: "http://rss.msn.com/en-us/money?feedoutput=rss",
}

export function getRssFeeds() {
    return rssParser.parseURL(API.baseUrl)
}
