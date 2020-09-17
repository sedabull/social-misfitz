import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import Menu from "../components/menu/Menu";
import { userIsNotAuthenticated } from "../redux/HOCs";
import MessageComponent from "../components/messageComponent/MessageComponent";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        <LoginForm />
        <MessageComponent text="TEST" />
      </div>
    );
  }
}

export default userIsNotAuthenticated(Home);
