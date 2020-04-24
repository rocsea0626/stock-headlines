import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class RssFeeds extends React.Component {

    render() {

        return (
            <Modal
                show={this.props.show}
                onHide={this.handleClose} 
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleClose = () => {
        this.props.handleClose()
    }

}

export default RssFeeds