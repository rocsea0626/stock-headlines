import * as React from "react";
import { Table, Row, Col, Navbar, Form, FormControl, Button, Container } from 'react-bootstrap';
import './StocksList.css';
import { Link } from 'react-router-dom';
import { formatPercentage, formatPrice } from '../../utils';
import { connect } from "react-redux"
import Spinner from 'react-bootstrap/Spinner'
import { addSymbol } from '../../actions'

class StocksList extends React.Component {

    constructor(props) {
        super(props)
        this.inputAddSymbol = React.createRef()
    }

    isIncreasing = (change) => {
        return change > 0
    }

    onAddClicked = () => {
        // console.log(this.inputAddSymbol.current.value)
        this.props.addSymbol(this.inputAddSymbol.current.value)
        this.inputAddSymbol.current.value = ''
    }

    renderToolbar = () => {
        return (
            <Navbar bg="light" expand='sm'>
                <Form inline>
                    <FormControl
                        type="text"
                        placeholder="Add stock symbol"
                        className="mr-sm-2"
                        ref={this.inputAddSymbol}
                    />
                    <Button variant='outline-info' onClick={(e) => { this.onAddClicked(e) }}>Send</Button>
                </Form>
            </Navbar>
        )
    }

    renderStocks = () => {
        const rows = Object.keys(this.props.quotes).map((key, idx) => {
            const q = this.props.quotes[key]
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
            <Container>
                {this.renderToolbar()}
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
            </Container>


        )
    }
}

const mapStateToProps = state => {
    return {
        quotes: state.quotes.quotes,
        symbols: state.quotes.symbols,
        loading: state.quotes.loading
    }
}

export default connect(
    mapStateToProps,
    { addSymbol }
)(StocksList)


