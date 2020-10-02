import React from "react";
import Button from "react-bootstrap/Button"

import "./Home.css"
import Menu from "../components/menu/Menu";
import { userIsNotAuthenticated } from "../redux/HOCs";
import LoginForm from "../components/loginForm/LoginForm";
import RegistrationForm from "../components/registrationForm/RegistrationForm";

class Home extends React.Component {
    state = {
        userHasAccount: false
    }

    toggle = e => {
        this.setState(state => ({ userHasAccount: !state.userHasAccount }));
    }

    render() {
        let form;

        if(this.state.userHasAccount) {
            form = <LoginForm />
        } else {
            form = <RegistrationForm />
        }



        return (
            <div className="Home">
                <Menu />
                <h2>Your favorite social hub for misfits.</h2>
                <div className="Centered">
                    {form}
                    <Button onClick={this.toggle}>
                        {this.state.userHasAccount ? "Need to Register?" : "Already a member?"}
                    </Button>
                </div>

            </div>
        );
    }
}

export default userIsNotAuthenticated(Home);
