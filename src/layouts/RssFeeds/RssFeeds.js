import React from 'react'
import { connect } from "react-redux"
import { Jumbotron, Spinner, ListGroup, Card } from 'react-bootstrap'

class RssFeeds extends React.Component {

    renderFeeds = () => {
        // console.log(this.props)
        const cards = this.props.feeds.map((f, idx) => {
            return <Card key={'key_card_' + idx}>
                <Card.Body>
                    <Card.Title>{f.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{f.pubDate}</Card.Subtitle>
                    <Card.Text>{f.content}<Card.Link href={f.link}>Link</Card.Link></Card.Text>
                </Card.Body>
            </Card>
        })

        return (
            <Jumbotron>{cards}</Jumbotron>
        )
    }

    render() {
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
        return this.renderFeeds()
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
)(RssFeeds)