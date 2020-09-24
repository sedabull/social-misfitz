import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateUser } from '../../services/dataService';

class UserUpdater extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: '',
            password: '',
            displayName: '',
            picture: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();

        if(!this.state.password) {
            updateUser(this.props.username, this.props.token, {
                about: this.state.about,
                displayName: this.state.displayName
            }).then(data => this.props.update());
        } else {
            updateUser(this.props.username, this.props.token, {
                about: this.state.about,
                password: this.state.password,
                displayName: this.state.displayName
            }).then(data => this.props.update());
        }

        this.props.onClose();
    }

    componentWillReceiveProps() {
        this.setState((state, props) => ({
            about: props.user.about,
            displayName: props.user.displayName
        }));
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your profile!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control 
                                type='text'
                                minLength={3}
                                maxLength={20}
                                onChange={this.handleChange}
                                value={this.state.displayName}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password'
                                minLength={3}
                                maxLength={20}
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Form.Group>
                        <Form.Group controlId="about">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control
                                type='textarea'
                                minLength={0}
                                maxLength={255}
                                onChange={this.handleChange}
                                value={this.state.about}
                            />
                        </Form.Group>
                        <Button block type='submit' variant="primary">
                            Submit Changes!
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default UserUpdater;