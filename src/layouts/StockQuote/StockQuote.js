import * as React from "react";
import { Table, Row, Col, Navbar, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPercentage, formatPrice } from '../../utils';
import { connect } from "react-redux"

class StockQuote extends React.Component {

    constructor(props) {
        super(props)
    }

    isIncreasing = (change) => {
        return change > 0
    }
    
    render() {
        const q = this.props.quote
        return (
            <tr key={this.props.id}>
                <td>{this.props.id + 1}</td>
                <td>
                    <Link to={"/chart/" + q.symbol}>
                        {q.symbol}
                    </Link>
                </td>
                <td>{q.shortName}</td>
                <td>
                    <Link to={"/chart/" + q.fullExchangeName}>
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
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quotes.quotes,
    }
}

export default connect(
    mapStateToProps
)(StockQuote)


