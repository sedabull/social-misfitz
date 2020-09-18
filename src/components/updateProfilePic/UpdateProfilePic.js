import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class UpdateProfilePic extends Component {
  state = { open: false };

  handleModal = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Time for a new look</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </React.Fragment>
    );
  }
}

export default UpdateProfilePic;
