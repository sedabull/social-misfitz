import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import RegistrationForm from "../components/registrationForm/RegistrationForm";
import Menu from "../components/menu/Menu";
import { userIsNotAuthenticated } from "../redux/HOCs";
<<<<<<< HEAD
import MisfitzProfile from "./MisfitzProfile";
=======
import MessageComponent from "../components/messageComponent/MessageComponent";
>>>>>>> 8ed5862b597854ca35a86383c8e667676f249ac3

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Menu />
        <h2>Your favorite social hub for misfits.</h2>
        <LoginForm />
<<<<<<< HEAD
        <MisfitzProfile />
=======
        <RegistrationForm />
>>>>>>> 8ed5862b597854ca35a86383c8e667676f249ac3
      </div>
    );
  }
}

export default userIsNotAuthenticated(Home);
