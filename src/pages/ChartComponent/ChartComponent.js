import React from 'react';
import './ChartComponent.css';
import { Yahoo } from '../../api';
import { Line } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';

class ChartComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            timestamps: [],
            quotes: []
        }
    }

    componentDidMount() {
        const { symbol } = this.props.match.params
        Yahoo.fetchChart(symbol)
            .then((res) => {

                this.setState({
                    timestamps: res.data.chart.result[0].timestamp,
                    quotes: res.data.chart.result[0].indicators.quote[0].close,
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const data = {
            labels: this.formatDates(this.state.timestamps),
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
                <Line data={data} />
            </Container>
        )
    }

    formatDates = (dates) => {
        return dates.map((d) => {
            return new Date(d * 1000).toDateString()
        })
    }
}

export default ChartComponent;
