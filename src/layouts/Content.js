import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StockList from "./StockList";
import LineChart from "../Charts/LineChart";
import * as mockData from "../data/data";
import {AlphaVantage} from "../api";
import RssFeeds from "./RssFeeds";

const style = {
    Paper: {
        padding: 0
    },
    container: {
        margin: 4
    }
}

const symbols = [
    // 'AMZN', 'AMBA', 'INX', '.DJI'
    'AMZN'
]

const timestamps = [
    '07-06-19', '08-06-19', '09-06-19', '10-06-19', '11-06-19', '12-06-19'
]

const prices = [
    '1', '2', '3', '4', '2', '6'
]


class Content extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quotes: []
        }
    }

    componentDidMount() {
        // AlphaVantage.getStockName(symbols[0], AlphaVantage.stockNameParser).then((res)=>{
        //     console.log(res)
        // })
        this.getData()
    }

    getData = () => {
        this.setState({quotes: AlphaVantage.quotesDailyParser(mockData.data)})
    }

    renderCharts = () => {
        return this.state.quotes.map((quote) => {
            console.log(quote)
            return (
                <LineChart key={"line-chart-" + quote.symbol}
                           title={quote.symbol}
                           labels={quote.prices.map(p => p.date)}
                           data={quote.prices.map(p => p.price.toString('.2d'))} color={"red"}/>
            )
        })
    }

    render() {
        console.log(this.state.quotes)
        return (
            <Grid container spacing={1} style={style.container}>
                <StockList symbols={symbols}/>
                <Grid item xs={12} lg={6}>
                    {/*<Paper style={style.Paper}>Middle Column</Paper>*/}
                    {this.renderCharts()}
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RssFeeds/>
                </Grid>
            </Grid>

        );
    }
}

export default Content


