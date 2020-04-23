import * as React from "react";
import Navbar from 'react-bootstrap/Navbar';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Navbar bg="light">
                    <Navbar.Brand>Stocks & Headlines</Navbar.Brand>
                </Navbar>
            </header>

        );
    }
}

export default Header