import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../components/menu/Menu";
import MisfitzUserProfile from "../components/misfitzUserProfile/MisfitzUserProfile";
import Card from "react-bootstrap/Card";
import MisfitzUserProfileMenu from "../components/misfitzUserProfileMenu/MisfitsUserProfileMenu";
import UpdateProfilePic from "../components/updateProfilePic/UpdateProfilePic";

class MisfitzProfile extends Component {
  render() {
    return (
      <React.Fragment>
        <MisfitzUserProfileMenu />
        <Card style={{ margin: "auto"}}>
          <MisfitzUserProfile />
          <UpdateProfilePic />
        </Card>
      </React.Fragment>
    );
  }
}
export default MisfitzProfile;
