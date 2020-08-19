import React from 'react'
import { connect } from "react-redux"
import './ChartComponent.css';
import { Line } from 'react-chartjs-2';
// import Container from 'react-bootstrap/Container'
import { Container, Spinner, Navbar, Nav, NavDropdown, ListGroup, Button, Form } from 'react-bootstrap'
import { formatTimestamp, formatPrice } from '../../utils'
import { RssFeeds, Error } from '../../layouts'
import { selectSymbol, fetchChart } from '../../actions'
import * as api from '../../api'
import { Link } from 'react-router-dom'
import { TypeChooser } from "react-stockcharts/lib/helper"
import Chart from './Chart'

class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInterval: api.getInterval(),
            currentRange: api.getRange()
        }
    }
    componentDidMount() {
        console.log('componentDidMount()')
        const { symbol } = this.props.match.params
        const { currentInterval, currentRange } = this.state
        this.props.fetchChart(symbol, currentInterval, currentRange)
    }

    intervalOnChange = (interval) => {
        this.setState({
            currentInterval: interval
        })
    }

    rangeOnChange = (range) => {
        this.setState({
            currentRange: range
        })
    }

    sendOnClicked = () => {
        const { symbol } = this.props.match.params
        const { currentInterval, currentRange } = this.state
        this.props.fetchChart(symbol, currentInterval, currentRange)
    }

    renderSymbols = () => {
        const { symbol } = this.props.match.params

        const symbols = this.props.symbols.map((s, idx) => {
            return (s === symbol) ? (
                <ListGroup.Item as="li" key={'key_symbol_list_' + idx} active>
                    <Link to={"/chart/" + s} >{s}</Link>
                </ListGroup.Item>
            ) : (
                    <ListGroup.Item as="li" key={'key_symbol_list_' + s} >
                        <Link to={"/chart/" + s} >{s}</Link>
                    </ListGroup.Item>
                )
        })

        return (
            < ListGroup as="ul" >
                {symbols}
            </ListGroup >
        )
    }

    renderIntervalsAndRanges = () => {

        const intervals = api.getAllowedIntervals().map((interval, idx) => {
            return (
                <NavDropdown.Item
                    key={'key_btn_interval_' + idx}
                    onSelect={() => { this.intervalOnChange(interval) }}
                >
                    {interval}
                </NavDropdown.Item>
            )
        })

        const ranges = api.getAllowedRanges().map((range, idx) => {
            return (
                <NavDropdown.Item
                    key={'key_btn_range_' + idx}
                    onClick={() => { this.rangeOnChange(range) }}
                >
                    {range}
                </NavDropdown.Item>
            )
        })
        const { symbol } = this.props.match.params
        const symbols = this.props.symbols.map((s, idx) => {
            return (s === symbol) ? (
                <NavDropdown.Item as="li" key={'key_symbol_list_' + idx}>
                    <Link to={"/chart/" + s} >{s}</Link>
                </NavDropdown.Item>
            ) : (
                    <NavDropdown.Item as="li" key={'key_symbol_list_' + s} >
                        <Link to={"/chart/" + s} >{s}</Link>
                    </NavDropdown.Item>
                )
        })

        return (
            <Navbar bg="light" expand='sm'>
                <Nav className="mr-auto">
                    <NavDropdown id="dropdown-basic-button-2" title={`${this.props.match.params.symbol}`}>
                        {symbols}
                    </NavDropdown>

                </Nav>
                <Form inline>
                    <NavDropdown id="dropdown-basic-button" title={`Range: ${this.state.currentRange}`}>
                        {ranges}
                    </NavDropdown>
                    <NavDropdown id="dropdown-basic-button-1" title={`Interval: ${this.state.currentInterval}`}>
                        {intervals}
                    </NavDropdown>
                    <Button variant='info' onClick={() => { this.sendOnClicked() }}>Send</Button>
                </Form>
            </Navbar>

        )
    }

    renderChart = () => {
        const { symbol } = this.props.match.params
        const data = {
            labels: this.props.timestamps.map((ts) => {
                return formatTimestamp(ts)
            }),
            datasets: [{
                label: symbol,
                data: this.props.quotes.map((p) => {
                    return formatPrice(p)
                }),
                fill: 'none',
                backgroundColor: "red",
                pointRadius: 2,
                borderColor: "red",
                borderWidth: 1,
                lineTension: 0
            }]
        }

        return (

            <Container className="chartContainer">
                {this.renderIntervalsAndRanges()}
                {
                    this.props.error ? (
                        <Error error={this.props.error} />
                    ) : (<Line
                        data={data}
                        onElementsClick={(elems) => { this.onDateClicked(elems) }}
                    />)
                }
                {
                    !!this.props.selectedTimeStamp ? <RssFeeds
                        symbol={symbol}
                    /> : ''
                }
            </Container>
        )
    }

    renderAreaChart = () => {
        const { symbol } = this.props.match.params

        return (
            <Container className="chartContainer">
                {this.renderIntervalsAndRanges()}
                {
                    this.props.error ? (
                        <Error error={this.props.error} />
                    ) : (
                            <Chart
                                data={this.props.data}
                                symbol={symbol}
                                onElemClicked={(elem) => { this.onElementClicked(elem) }}
                            />
                        )
                }
                {
                    !!this.props.selectedTimeStamp ? <RssFeeds
                        symbol={symbol}
                    /> : ''
                }
            </Container>
        )
    }

    render() {
        if (this.props.loading) {
            return (
                <Spinner animation="border" variant="primary" />
            )
        }

        // return this.renderChart()

        return this.renderAreaChart()
    }

    onDateClicked = (elems) => {

        if (elems[0]) {
            const idx = elems[0]._index
            const ts = this.props.timestamps[idx]
            const { symbol } = this.props.match.params
            this.props.selectSymbol(symbol, ts)
        }
    }
    
    onElementClicked = (elem) => {
        const { symbol } = this.props.match.params
        const ts = new Date(elem.currentItem.date).valueOf()
        this.props.selectSymbol(symbol, ts)
    }
}

const mapStateToProps = state => {
    return {
        selectedTimeStamp: state.chart.selectedTimeStamp,
        timestamps: state.chart.timestamps,
        quotes: state.chart.quotes,
        data: state.chart.data,
        loading: state.chart.loading,
        error: state.chart.error,
        symbols: state.quotes.quotes.map((q) => {
            return q.symbol
        })
    }
}

export default connect(
    mapStateToProps,
    { selectSymbol, fetchChart }
)(ChartComponent)
