import React from 'react'
import { connect } from "react-redux"
import './ChartComponent.css';
import { Line } from 'react-chartjs-2';
// import Container from 'react-bootstrap/Container'
import { Container, Spinner, Navbar, Nav, NavDropdown, Breadcrumb } from 'react-bootstrap'
import { formatTimestamp, formatPrice } from '../../utils'
import { RssFeeds, Error } from '../../layouts'
import { selectSymbol, fetchChart } from '../../actions'
import { API } from '../../api/constants'

class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInterval: API.yahoo.interval,
            currentRange: API.yahoo.range
        }
    }
    componentDidMount() {
        console.log('componentDidMount()')
        const { symbol } = this.props.match.params
        const { currentInterval, currentRange } = this.state
        this.props.fetchChart(symbol, currentInterval, currentRange)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate()')
        // console.log(prevState)
        if (prevState.currentInterval !== this.state.currentInterval ||
            prevState.currentRange !== this.state.currentRange) {

            const { symbol } = this.props.match.params
            const { currentInterval, currentRange } = this.state
            this.props.fetchChart(symbol, currentInterval, currentRange)
        }
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

    renderIntervalsAndRanges = () => {

        const intervals = API.yahoo.allowed.intervals.map((interval, idx) => {
            return (
                <NavDropdown.Item
                    key={'key_btn_interval_' + idx}
                    onSelect={() => { this.intervalOnChange(interval) }}
                >
                    {interval}
                </NavDropdown.Item>
            )
        })

        const ranges = API.yahoo.allowed.range.map((range, idx) => {
            return (
                <NavDropdown.Item
                    key={'key_btn_range_' + idx}
                    onClick={() => { this.rangeOnChange(range) }}
                >
                    {range}
                </NavDropdown.Item>
            )
        })

        return (
            <Navbar bg="light" expand='sm'>
                <Nav className="justify-content-center" activeKey="/home" >
                    <NavDropdown id="dropdown-basic-button" title={`Range: ${this.state.currentRange}`}>
                        {ranges}
                    </NavDropdown>
                    <NavDropdown id="dropdown-basic-button" title={`Interval: ${this.state.currentInterval}`}>
                        {intervals}
                    </NavDropdown>
                </Nav >
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
                <h1>Chart: {symbol}</h1>
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

    render() {
        console.log('render()')
        if (this.props.loading) {
            return (
                <Spinner animation="border" variant="primary" />
            )
        }

        return this.renderChart()
    }

    onDateClicked = (elems) => {

        if (elems[0]) {
            const idx = elems[0]._index
            const ts = this.props.timestamps[idx]
            const { symbol } = this.props.match.params
            this.props.selectSymbol(symbol, ts)
        }
    }
}

const mapStateToProps = state => {
    return {
        selectedTimeStamp: state.chart.selectedTimeStamp,
        timestamps: state.chart.timestamps,
        quotes: state.chart.quotes,
        loading: state.chart.loading,
        error: state.chart.error,
    }
}

export default connect(
    mapStateToProps,
    { selectSymbol, fetchChart }
)(ChartComponent)
