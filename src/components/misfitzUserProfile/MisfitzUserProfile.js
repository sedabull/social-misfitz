import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import blackWidow from "../../images/Black-Widow-Avengers.jpg";

class MisfitzUserProfile extends Component {
  // componentDidMount() {
  //   this.props.getLoggedInUserInfo();
  // }
  render() {
    return (
      // <Card className="bg-dark text-white">
      //   <Card.Img src="holder.js/100px270" alt="Card image" />
      //   <Card.ImgOverlay>
      //     <Card.Title>Card title</Card.Title>
      //     <Card.Text>
      //       This is a wider card with supporting text below as a natural lead-in
      //       to additional content. This content is a little bit longer.
      //     </Card.Text>
      //     <Card.Text>Last updated 3 mins ago</Card.Text>
      //   </Card.ImgOverlay>
      // </Card>

      <Card style={{ margin: "auto"}}  >
        <Card.Img variant="top" src={blackWidow} alt="Card image" />
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go Misfitin'</Button>
        </Card.Body>
      </Card>
      
    );
  }
}

export default MisfitzUserProfile;
