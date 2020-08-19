import * as React from "react";
import { Navbar, Container } from "react-bootstrap"
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <Navbar sticky="bottom" bg="light">
                <Navbar.Brand>
                    Copyright GHP Arctic
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default Footer