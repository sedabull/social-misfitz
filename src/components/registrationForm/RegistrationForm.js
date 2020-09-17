import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import "./RegistrationForm.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { createUser } from '../../services/dataService';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            displayName: "",
            validated: false,
            errMessage: ""
        };
    }

    handleRegistration = e => {
        e.preventDefault();
        let {username, password, displayName} = this.state;
        createUser({username, password, displayName}).then(res => {
            console.log(res);
            if(res.statusCode === 200) {
                this.setState({ validated: true, errMessage: "" })
            } else {
                this.setState({ validated: false, errMessage: res.message })
            }
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleDismissError = e => {
        this.setState({ errMessage: '' })
    };

    render() {
        const errMessage = this.state.errMessage;
        const validated = this.state.validated;
        const { loading } = this.props;

        return (
            <div className="RegistrationForm">
                <Form validated={validated} onSubmit={this.handleRegistration}>
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

                    <Form.Group controlId="displayName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="displayName"
                            minlength={3}
                            maxlength={20}
                            onChange={this.handleChange}
                            placeholder="Jane/John Doe"
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
                {loading && <Spinner name="circle" color="blue" />}
                {errMessage && <Alert dismissible onClose={this.handleDismissError} variant="danger">{errMessage}</Alert>}
            </div>
        );
    }
}

export default RegistrationForm;