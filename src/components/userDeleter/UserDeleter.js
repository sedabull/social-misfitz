import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { withAsyncAction } from "../../redux/HOCs";
import { deleteUser } from '../../services/dataService';

class UserDeleter extends React.Component {
    deleteAccount = e => {
        e.preventDefault();
        this.props.logout();

        deleteUser(this.props.username, this.props.token).then(data => {
            if(data.statusCode === 200) {
                console.log('Successfully deleted account!');
            } else {
                console.error(data.message);
            }
        });
    }

    render() {
        return (
            <div className="UserDeleter">
                <Modal size="sm" show={this.props.show} onHide={this.props.onClose}>
                    <Modal.Header closeButton>
                        ARE YOU SURE?
                    </Modal.Header>
                    
                    <Modal.Body>

                        <Nav.Link to="#" onClick={this.props.onClose}>
                            <Button block variant="secondary">
                                Cancel
                            </Button>
                        </Nav.Link>

                        <Nav.Link to="/" onClick={this.deleteAccount}>
                            <Button block variant="danger">
                                Delete
                            </Button>
                        </Nav.Link>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default withAsyncAction("auth", "logout")(UserDeleter);