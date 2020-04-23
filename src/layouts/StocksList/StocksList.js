import * as React from "react";
import { Yahoo } from "../../api";
import Table from 'react-bootstrap/Table';
import './StocksList.css'


class StocksList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quotes: []
        }
    }

    componentDidMount() {
        console.log("componentDidMount()")
        const symbols = [
            'AMZN',
            'AMBA',
            'NVDA',
            'TSM'
        ]
        this.getData(symbols)
    }

    getData = (symbols) => {

        Yahoo.fetchQuotes(symbols)
            .then((res) => {
                console.log(res.data.quoteResponse.result)
                this.setState({
                    quotes: res.data.quoteResponse.result
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    isIncreasing = (change) => {
        if(change)
            return change > 0

        return false
    }

    formatPercentage = (percentageStr) => {
        return Number.parseFloat(percentageStr).toFixed(2)
    }

    renderStocks = () => {
        const rows = this.state.quotes.map((q, idx) => {
            // console.log(q)
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{q.symbol}</td>
                    <td>{q.shortName}</td>
                    <td>{q.fullExchangeName}</td>
                    <td className={`priceChange ${this.isIncreasing(q.regularMarketChange) ? "increase" : "decrease"}`
                    }>
                        {q.currency + ' ' + q.regularMarketPrice}
                    </td>
                    <td className={`priceChange ${this.isIncreasing(q.regularMarketChangePercent) ? "increase" : "decrease"}`
                    }>
                        {this.formatPercentage(q.regularMarketChangePercent)+'%'}
                    </td>
                    <td>{q.regularMarketVolume}</td>
                </tr>
            )
        })

        return rows
    }

    render() {
        // console.log(this.state.quotes)
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Exchange</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderStocks()}
                </tbody>
            </Table>
        );
    }
}

export default StocksList


