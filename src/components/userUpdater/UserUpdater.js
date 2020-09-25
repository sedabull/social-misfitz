import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateUser, setUserPicture } from '../../services/dataService';

class UserUpdater extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            about: '',
            password: '',
            displayName: '',
            pictureName: '',
            pictureBlob: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleFile = e => {
        this.setState({
            pictureName: e.target.value,
            pictureBlob: e.target.files[0]
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        if(this.state.pictureBlob) {
            setUserPicture(
                this.props.username,
                this.props.token,
                this.state.pictureBlob
            ).then(data => {
                if(data.statusCode === 200) {
                    this.props.update();
                } else {
                    console.error(data.message);
                }
            })
        }

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

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password'
                                minLength={3}
                                maxLength={20}
                                placeholder="optional"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Form.Group>

                        <Form.Group controlId="picture">
                            <Form.Label>Picture File</Form.Label>
                            <Form.File
                                custom
                                onChange={this.handleFile}
                                label={this.state.pictureName || "please choose a very small file..."}
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