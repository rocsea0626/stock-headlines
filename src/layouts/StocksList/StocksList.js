import * as React from "react";
import { Yahoo } from "../../api";
import Table from 'react-bootstrap/Table';
import './StocksList.css';
import { Link } from 'react-router-dom';
import {formatPercentage, formatPrice} from '../../utils';


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
        if (change)
            return change > 0

        return false
    }

    renderStocks = () => {
        const rows = this.state.quotes.map((q, idx) => {
            // console.log(q)
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                        <Link to={"/charts/" + q.symbol}>
                            {q.symbol}
                        </Link>
                    </td>
                    <td>{q.shortName}</td>
                    <td>
                        <Link to={"/charts/" + q.fullExchangeName}>
                            {q.fullExchangeName}
                        </Link>
                    </td>
                    <td className={`priceChange ${this.isIncreasing(q.regularMarketChange) ? "increase" : "decrease"}`
                    }>
                        {q.currency + ' ' + formatPrice(q.regularMarketPrice)}
                    </td>
                    <td className={`priceChange ${this.isIncreasing(q.regularMarketChangePercent) ? "increase" : "decrease"}`
                    }>
                        {formatPercentage(q.regularMarketChangePercent)}
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
            <Table hover="true">
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


