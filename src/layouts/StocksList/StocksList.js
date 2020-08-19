import * as React from "react";
import { Table, Row, Col } from 'react-bootstrap';
import './StocksList.css';
import { Link } from 'react-router-dom';
import { formatPercentage, formatPrice } from '../../utils';
import { connect } from "react-redux"
import { fetchQuotes } from '../../actions'
import Spinner from 'react-bootstrap/Spinner'

class StocksList extends React.Component {

    componentDidMount() {
        this.props.fetchQuotes()
    }

    isIncreasing = (change) => {
        return change > 0
    }

    renderStocks = () => {
        const rows = this.props.quotes.map((q, idx) => {
            return (
                <tr key={idx}>
                    <td>{idx + 1}</td>
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
        })
        return rows
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" />
        }
        return (
            <Row>
                <Col lg={11} xl={10}>
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
                </Col>
            </Row>

        );
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quotes.quotes,
        loading: state.quotes.loading
    }
}

export default connect(
    mapStateToProps,
    { fetchQuotes }
)(StocksList)


