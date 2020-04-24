import React from 'react';
import './ChartComponent.css';
import { Yahoo } from '../../api';
import { Line } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import { formatTimestamp, formatPrice } from '../../utils'
import {
    RssFeeds
} from '../../layouts';

class ChartComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showRssFeeds: false,
            timestamps: [],
            quotes: []
        }
    }

    componentDidMount() {
        const { symbol } = this.props.match.params

        Yahoo.fetchChart(symbol)
            .then((res) => {
                const { result } = res.data.chart
                this.setState({
                    timestamps: result[0].timestamp.map((ts) => {
                        return formatTimestamp(ts)
                    }),
                    quotes: result[0].indicators.quote[0].close.map((p) => {
                        return formatPrice(p)
                    }),
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const data = {
            labels: this.state.timestamps,
            datasets: [{
                label: this.props.match.params.symbol,
                data: this.state.quotes,
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
                <h1>Chart: {this.props.match.params.symbol}</h1>
                <RssFeeds
                    show={this.state.showRssFeeds}
                    handleClose={this.hideRssFeeds}
                />
                <Line
                    data={data}
                    onElementsClick={(elems) => { this.onDateClicked(elems) }}
                />
            </Container>
        )
    }

    onDateClicked = (elems) => {

        if (elems[0]) {
            const idx = elems[0]._index
            const ts = this.state.timestamps[idx]
            const date = Date.parse(new Date(ts).toDateString())

            this.setState({
                showRssFeeds: true
            })
        }
    }

    hideRssFeeds = () => {
        this.setState({
            showRssFeeds: false
        })
    }

}

export default ChartComponent;
