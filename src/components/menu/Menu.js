import React from "react";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/MessageFeed">Message Feed</Nav.Link>
                <Nav.Link to="/" onClick={this.handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </div>
          )}
        </Navbar>
      // </div>
    );
  }
}

export default withAsyncAction("auth", "logout")(Menu);
