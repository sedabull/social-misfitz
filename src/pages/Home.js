import React from "react";
import Menu from "../components/menu/Menu";
import LoginForm from "../components/loginForm/LoginForm";
import RegistrationForm from "../components/registrationForm/RegistrationForm";
import { userIsNotAuthenticated } from "../redux/HOCs";
import "./Home.css"
import Button from "react-bootstrap/Button"

class Home extends React.Component {
  state={
    userHasAccount: false
  }

  switchToLogin = e => {
    this.setState({userHasAccount: true})
  }

  render() {
    let form;

    if(this.state.userHasAccount){
      form = <LoginForm/>

    } else {
      form = <RegistrationForm/>
    }



    return (
      <div className="Home">
        <Menu />
        <h2>Your favorite social hub for misfits.</h2>
        <div className="Centered">
          {form}
          <Button onClick={this.switchToLogin}>Already A Menmer?</Button>
        </div>
        
      </div>
    );
  }
}

export default userIsNotAuthenticated(Home);
