import React from "react";
import Spinner from "react-spinkit";
import { withAsyncAction } from "../../redux/HOCs";
import "./LoginForm.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;

    return (
        <div className="LoginForm">
            <Form onSubmit={this.handleLogin}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        autoFocus
                        required
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
                    Login
                </Button>
            </Form>
            {loading && <Spinner name="circle" color="blue" />}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
    );
  }
}

export default withAsyncAction("auth", "login")(LoginForm);
