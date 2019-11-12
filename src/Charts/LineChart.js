import * as React from "react";
import Chart from 'chart.js';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                scales: {
                    // xAxes: [
                    //     {
                    //         type: 'time',
                    //         time: {
                    //             unit: 'week'
                    //         }
                    //     }
                    // ],
                    // yAxes: [
                    //     {
                    //         ticks: {
                    //             min: 0
                    //         }
                    //     }
                    // ]
                }
            },
            data: {
                labels: this.props.labels,
                datasets: [{
                    label: this.props.title,
                    data: this.props.data,
                    fill: 'none',
                    backgroundColor: this.props.color,
                    pointRadius: 2,
                    borderColor: this.props.color,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate()")
    }

    render() {
        return <canvas ref={this.canvasRef} />;
    }
}

export default LineChart;
