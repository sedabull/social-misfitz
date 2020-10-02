import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import UserUpdater from "../userUpdater/UserUpdater";
import ghostUser from "../../assets/ghostuser.png";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  showModal = (e) => {
    this.setState({ showModal: true });
  };

  hideModal = (e) => {
    this.setState({ showModal: false });
  };

  render() {
    let button = null;
    let url = this.props.user.pictureLocation
      ? "https://socialapp-api.herokuapp.com"
      : "";

    if (this.props.username === this.props.match.params.username) {
      button = (
        <Button block variant="primary" onClick={this.showModal}>
          Update Profile
        </Button>
      );
    }

    return (
      <div className="UserPicture">
        <Card style={{ width: "25rem" }} border = "white">
          <Card.Img
            class="rounded-circle"
            variant="top"
            src={url ? url + this.props.user.pictureLocation : ghostUser}
          />
          <Card.Body>
            <Card.Title>{this.props.user.displayName}</Card.Title>
            <Card.Text>{this.props.user.about}</Card.Text>
          </Card.Body>
          {button}
          <UserUpdater
            {...this.props}
            onClose={this.hideModal}
            show={this.state.showModal}
          />
        </Card>
      </div>
    );
  }
}

export default UserProfile;
