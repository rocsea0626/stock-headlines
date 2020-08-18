
export const API = {
    yahoo: {
        region: "US",
        lang: "en",
        headers: {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "45a94b3954msh28833e1f7fe08c9p1ef075jsn9f89609f22e6"
        },
        interval: "1d",
        range: "6mo",
        allowed: {
            intervals: ["5m", "15m", "1d", "1wk", "1mo"],
            range: ["1d", "5d", "3mo", "6mo", "1y", "5y", "max"]
        }
    },
    yahooFree: {
        region: "US",
        lang: "en",
        headers: {
            "x-rapidapi-host": "yahoo-finance-free.p.rapidapi.com",
            "x-rapidapi-key": "f25292979emsh32ec73128e05cbfp177485jsn17508be6010b",
            "useQueryString": true
        },
        resources: {
            stockDetails: {
                description: 'Get very detailed information for a particular stock.',
                url: "https://yahoo-finance-free.p.rapidapi.com/v11/finance/quoteSummary/"
            },
            quotes: {
                description: 'Real time quote data for stocks, ETFs, mutuals funds, etc…',
                url: "https://yahoo-finance-free.p.rapidapi.com/v6/finance/quote"
            },
            chart: {
                description: 'Get chart data by ticker',
                url: "https://yahoo-finance-free.p.rapidapi.com/v8/finance/chart/",
                interval: "1d",
                range: "6mo",
                allowed: {
                    intervals: ["1d", "1wk", "1mo"],
                    range: ["3mo", "6mo", "1y", "5y", "max"]
                },
            },
            summary: {
                description: 'Get live market summary information at the request time',
                url: "https://yahoo-finance-free.p.rapidapi.com/v6/finance/quote/marketSummary",

            }
        }
    },
    aws: {
        baseUrl: "https://17i4pfrcb8.execute-api.us-east-1.amazonaws.com/dev/",
    }
}