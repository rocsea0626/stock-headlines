import React from 'react'
import { connect } from "react-redux"
import { Jumbotron, Spinner } from 'react-bootstrap'
import { fetchRssFeeds } from '../../actions'

class RssFeeds extends React.Component {

    componentDidMount() {
        console.log('componentDidMount()')
        const { symbol, timestamp } = this.props
        this.props.fetchRssFeeds(symbol, timestamp)
    }

    render() {
        console.log('render()')
        const { symbol, timestamp } = this.props

        if (this.props.loading) {
            return (
                <Spinner animation="border" variant="primary" />
            )
        }
        if (!!this.props.error) {
            return (
                <Jumbotron>
                    <h1>Error</h1>
                </Jumbotron>
            )
        }
        return (
            <Jumbotron>
                <h1>{symbol}</h1>
                <p>{timestamp}</p>
            </Jumbotron>
        )
    }
}

const mapStateToProps = state => {
    return {
        timestamp: state.chart.selectedTimeStamp,
        feeds: state.rssFeeds.feeds,
        loading: state.rssFeeds.loading,
        error: state.rssFeeds.error,
    }
}

export default connect(
    mapStateToProps,
    { fetchRssFeeds }
)(RssFeeds)