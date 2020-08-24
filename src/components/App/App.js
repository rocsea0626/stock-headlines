import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    StocksList, Header, Footer
} from '../../components'
import {
    Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import { connect } from "react-redux"
import { ChartComponent, NotFound } from '..'
import { fetchSymbolsAndQuotes } from '../../actions'

function App(props) {

    useEffect(() => {
        props.fetchSymbolsAndQuotes()
    })

    return (
        <Router>
            <Header />
            <main role='main' className='App'>
                <Switch>
                    {/* <Route path="/" component={SiteLocation} /> */}
                    <Route exact path="/" component={StocksList} />
                    <Route path="/chart/:symbol" component={ChartComponent} />
                    <Route component={NotFound} />
                </Switch>
            </main>

            <Footer />
        </Router>
    )
}

export default connect(
    null,
    { fetchSymbolsAndQuotes }
)(App)
