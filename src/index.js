import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import {
    Header,
    Footer,
} from './layouts';

import {
    App,
    ChartComponent,
    NotFound
} from './pages';

const routing = (
    <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/charts/:symbol" component={ChartComponent} />
            {/* <Route path="/contact" component={Contact} /> */}
            <Route component={NotFound} />
        </Switch>
        <Footer />
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
