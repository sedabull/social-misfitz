import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";
import Navbar from "react-bootstrap/Navbar"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"


class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div className="Menu">

        <Navbar bg="light" expand="lg">
          <h1>Kwitter</h1>
          {this.props.isAuthenticated && (
            <div id="menu-links">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/MessageFeed">Message Feed</Nav.Link>
                <Nav.Link to="/" onClick={this.handleLogout}>
                  Logout
            </Nav.Link>
              </Nav>
            </div>
          )}





        </Navbar>
      </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
