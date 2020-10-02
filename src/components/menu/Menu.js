import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";
import madDog from "../../images/angry-chihuahua.jpg";

class Menu extends React.Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      // <div className="Menu">
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={madDog}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{" "}
            {/* Misfitz Unite! */}
          </Navbar.Brand>
          <h1>Misfitz Unite!</h1>
          {this.props.isAuthenticated && (
            <div id="menu-links">
              <Nav className="mr-auto">
                <Link to="/">Home</Link>
                <Link to="/messageFeed">Message Feed</Link>
                <Link to="/users">Users</Link>
                <Link to="/" onClick={this.handleLogout}>Logout</Link>
              </Nav>
            </div>
          )}
        </Navbar>
      // </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
