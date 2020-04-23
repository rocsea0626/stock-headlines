import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
        Header, 
        Footer, 
        StocksList } from './layouts';

function App() {

    return (
        <div className="App">
            <Header />
            <StocksList />
            <Footer />
        </div>
    )
}

export default App;
