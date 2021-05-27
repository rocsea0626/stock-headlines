import * as React from "react";
import { Table, Badge, Navbar, Form, FormControl, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import './StocksList.css';
import { Link } from 'react-router-dom';
import { formatPercentage, formatPrice } from '../../utils';
import { connect } from "react-redux"
import Spinner from 'react-bootstrap/Spinner'
import { addSymbol, removeSymbol } from '../../actions'

class StocksList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showEdit: false
        }
        this.inputAddSymbol = React.createRef()
    }

    isIncreasing = (change) => {
        return change > 0
    }

    onAddClicked = () => {
        // console.log(this.inputAddSymbol.current.value)
        this.props.addSymbol(this.inputAddSymbol.current.value)
        this.inputAddSymbol.current.value = ''
        this.setState({
            showEdit: false
        })
    }

    onEditClicked = (checked) => {
        this.setState({
            showEdit: checked
        })
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
                    <Button variant='outline-info' onClick={(e) => { this.onAddClicked(e) }}>Add</Button>
                </Form>
                <h3><Badge variant="light">|</Badge></h3>

                <ButtonGroup toggle>
                    <ToggleButton
                        type="checkbox"
                        variant="outline-info"
                        checked={this.state.showEdit}
                        value="1"
                        onChange={(e) => this.onEditClicked(e.currentTarget.checked)}
                    >
                        Edit
                        </ToggleButton>
                </ButtonGroup>
            </Navbar>
        )
    }

    renderStocks = () => {
        return this.props.symbols.map((symbol, idx) => {

            const q = this.props.quotes[symbol] ?
                this.props.quotes[symbol] :
                {
                    symbol: symbol,
                    shortName: 'N/A',
                    fullExchangeName: 'N/A',
                    currency: 'N/A',
                    regularMarketPrice: 0,
                    regularMarketChangePercent: 0,
                    regularMarketVolume: 0
                }

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

                    {
                        this.state.showEdit ? (
                            <td><Button
                                onClick={() => { this.props.removeSymbol(q.symbol) }}
                                variant='outline-danger'>X</Button>
                            </td>
                        ) : null
                    }

                </tr>
            )
        })
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" />
        }

        return (
            <React.Fragment>
                {this.renderToolbar()}
                <Table responsive="sm" hover="true">
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
            </React.Fragment>
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
    { addSymbol, removeSymbol }
)(StocksList)


