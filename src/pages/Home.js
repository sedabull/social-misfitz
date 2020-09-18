import React from "react";
import Menu from "../components/menu/Menu";
import LoginForm from "../components/loginForm/LoginForm";
import RegistrationForm from "../components/registrationForm/RegistrationForm";
import { userIsNotAuthenticated } from "../redux/HOCs";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Menu />
        <h2>Your favorite social hub for misfits.</h2>
        <LoginForm />
        <RegistrationForm />
      </div>
    );
  }
}

export default userIsNotAuthenticated(Home);
