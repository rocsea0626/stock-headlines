import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    StocksList, Header, Footer
} from '../../layouts'
import {
    Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import { connect } from "react-redux"
import { ChartComponent, NotFound } from '../'
import { fetchQuotes } from '../../actions'

function App(props) {

    useEffect(() => {
        props.fetchQuotes()
    })

    return (
        <Router>
            <Header />
            <div className="App">
                <Switch>
                    {/* <Route path="/" component={SiteLocation} /> */}
                    <Route exact path="/" component={StocksList} />
                    <Route path="/chart/:symbol" component={ChartComponent} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}

export default connect(
    null,
    { fetchQuotes }
)(App)
