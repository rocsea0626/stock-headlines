import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    StocksList, Header, Footer
} from '../../layouts'
import {
    Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import {ChartComponent, NotFound} from '../'

function App() {

    return (
        <Router>
        <Header />
        <div className="App">
            <Switch>
                <Route exact path="/" component={StocksList} />
                <Route path="/charts/:symbol" component={ChartComponent} />
                {/* <Route path="/contact" component={Contact} /> */}
                <Route component={NotFound} />
            </Switch>
        </div>
        <Footer />
    </Router>
    )
}

export default App;
