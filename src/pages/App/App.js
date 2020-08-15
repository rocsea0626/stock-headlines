import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    StocksList, Header, Footer, SiteLocation
} from '../../layouts'
import {
    Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import { ChartComponent, NotFound } from '../'


const withBreadCrumbs = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <React.Fragment>
                    <SiteLocation {...this.props}/>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
          }
    }
}

function App() {
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

export default App;
