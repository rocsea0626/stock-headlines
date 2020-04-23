import React from 'react';
import './Chart.css';
import {
    LineChart
} from '../../layouts/Charts';

class Chart extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {symbol} = this.props.match.params
        
    }

    render() {
        return (
            <div>
                <h1>Chart: {this.props.match.params.symbol}</h1>
                {/* <LineChart /> */}
            </div>
        )
    }
}

export default Chart;
