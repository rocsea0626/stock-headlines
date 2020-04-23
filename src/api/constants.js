
export const API = {
    yahoo: {
        region: "US",
        lang: "en",
        headers: {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "45a94b3954msh28833e1f7fe08c9p1ef075jsn9f89609f22e6"
        },
        interval: "1wk",
        range: "5y",
        allowed: {
            intervals: ["5m", "15m", "1d", "1wk", "1mo"],
            range: ["1d", "5d", "3mo", "6mo", "1y", "5y", "max"]
        }
    }
}