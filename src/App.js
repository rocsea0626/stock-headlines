import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Header, Footer, Content} from './layouts';

function App() {

    return (
        <React.Fragment>
            <CssBaseline/>
            <div className="App">
                <Header />
                <Content />
                <Footer />
            </div>

        </React.Fragment>
    )
}

export default App;
