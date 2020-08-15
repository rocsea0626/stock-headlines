import * as React from "react";
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <header>
                <Navbar bg="light">
                    <Navbar.Brand>
                        <Link to="/">
                            Stocks & Headlines
                        </Link>
                    </Navbar.Brand>
                </Navbar>
            </header>

        );
    }
}

export default Header