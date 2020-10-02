import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './MessagePoster.css';
import { createMessage } from '../../services/dataService';

class MessagePoster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    postMessage = e => {
        e.preventDefault();

        createMessage(this.state.message, this.props.token).then(data => {
            if(data.statusCode === 200) {
                this.props.update();
            } else {
                console.error(data.message);
            }

            this.setState({ message: '' });
            this.props.onClose();
        });
    }
    
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        return (
            <div className="MessagePoster">
                <Modal show={this.props.show} onHide={this.props.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post a new Message:</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.postMessage}>
                            <Form.Group controlId="message">
                                <Form.Control
                                    required
                                    rows={3}
                                    as="textarea"
                                    minLength={2}
                                    maxLength={255}
                                    value={this.state.message}
                                    onChange={this.handleChange}
                                    placeholder="make it count..."
                                />
                            </Form.Group>
                            <Button block type="submit" variant="primary">Tell the World!</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default MessagePoster;