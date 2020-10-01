import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";

class Menu extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="Menu">
        <Navbar bg="light" expand="lg">
          <h1>Social Misfitz</h1>
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
      </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
