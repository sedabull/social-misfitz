import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";
import Card from "react-bootstrap/Card";
import Squirrel from "../images/Squirrel-404.jpg";

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <p>Page not found {this.props.location.pathname}</p>
        <Link to="/">Go Home</Link>
        <Card>
          <Card.Img variant="top" 
          img src={Squirrel} 
          alt="../images/Squirrel-404.jpg"/>
        </Card>
      </div >
    );
  }
}

export default NotFound;
