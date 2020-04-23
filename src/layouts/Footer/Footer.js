import * as React from "react";
import Container from "react-bootstrap/Container";
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container>
                    Copyright GHP Arctic
                </Container>
            </footer>
        );
    }
}

export default Footer