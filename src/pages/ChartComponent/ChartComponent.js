import React from 'react'
import { connect } from "react-redux"
import './ChartComponent.css';
import { Yahoo } from '../../api';
import { Line } from 'react-chartjs-2';
// import Container from 'react-bootstrap/Container'
import { Container, Spinner } from 'react-bootstrap'
import { formatTimestamp, formatPrice } from '../../utils'
import { RssFeeds } from '../../layouts'
import { selectSymbol, fetchChart } from '../../actions'

class ChartComponent extends React.Component {

    componentDidMount() {
        const { symbol } = this.props.match.params
        this.props.fetchChart(symbol)
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
                <Line
                    data={data}
                    onElementsClick={(elems) => { this.onDateClicked(elems) }}
                />
                <RssFeeds
                    show={!!this.props.selectedTimeStamp}
                    symbol={symbol}
                    timestamp={this.props.selectedTimeStamp}
                />
            </Container>
        )
    }

    render() {
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
    }
}

export default connect(
    mapStateToProps,
    { selectSymbol, fetchChart }
)(ChartComponent)
