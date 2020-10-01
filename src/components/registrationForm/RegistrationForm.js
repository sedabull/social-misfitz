import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import "./RegistrationForm.css";
import { withAsyncAction } from "../../redux/HOCs";
import { createUser } from '../../services/dataService';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            displayName: ""
        };
    }

    handleRegistration = e => {
        e.preventDefault();
        let { username, password } = this.state;
        
        createUser(this.state).then(data => {
            if(data.statusCode === 200) {
                this.props.login({ username, password });
            } else {
                console.error(data.message);
            }
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { loading } = this.props;

        return (
            <div className="RegistrationForm">
                <Form onSubmit={this.handleRegistration}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                            minlength={3}
                            maxlength={20}
                            type="text"
                            name="username"
                            onChange={this.handleChange}
                            placeholder="please enter username..."
                        />
                    </Form.Group>

                    <Form.Group controlId="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="displayName"
                            minlength={3}
                            maxlength={20}
                            onChange={this.handleChange}
                            placeholder="please enter display name..."
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="password"
                            minlength={3}
                            maxlength={20}
                            onChange={this.handleChange}
                            placeholder="please enter password..."
                        />
                    </Form.Group>

                    <Button
                        block
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withAsyncAction("auth", "login")(RegistrationForm);