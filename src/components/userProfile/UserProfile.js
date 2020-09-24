import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserUpdater from '../userUpdater/UserUpdater';
import { getUser } from '../../services/dataService';
import ghostUser from '../../assets/ghostuser.png';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                pictureLocation: '',
                username: '',
                displayName: '',
                about: '',
                googleId: null,
                createdAt: '',
                updatedAt: ''
            }
        };
    }

    componentDidMount() {
        this.updateUser();
    }

    showModal = e => {
        this.setState({ showModal: true });
    }

    hideModal = e => {
        this.setState({ showModal: false });
    }

    updateUser = () => {
        getUser(this.props.match.params.username).then(data => {
            this.setState({ user: data.user });
        });
    }

    render() {
        let button = null;
        let url = this.state.user.pictureLocation ? 'https://socialapp-api.herokuapp.com' : '';

        if(this.props.username === this.props.match.params.username) {
            button = (
                <Button block variant="primary" onClick={this.showModal}>
                    Update Profile
                </Button>
            );
        }
        
        return (
            <div className="UserPicture">
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant='top' src={url + this.state.user.pictureLocation || ghostUser} />
                    <Card.Body>
                        <Card.Title>
                            {this.state.user.displayName}
                        </Card.Title>
                        <Card.Text>
                            {this.state.user.about}
                        </Card.Text>
                    </Card.Body>
                    {button}
                    <UserUpdater
                        {...this.props}
                        update={this.updateUser}
                        onClose={this.hideModal}
                        show={this.state.showModal}
                        about={this.state.user.about}
                        displayName={this.state.user.displayName}
                    />
                </Card>
            </div>
        );
    }
}

export default UserProfile;