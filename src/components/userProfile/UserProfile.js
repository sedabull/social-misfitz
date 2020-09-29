import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ghostUser from '../../assets/ghostuser.png';
import UserUpdater from '../userUpdater/UserUpdater';
import UserDeleter from '../userDeleter/UserDeleter';
import MessagePoster from "../messagePoster/MessagePoster";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: false,
            update: false,
            delete: false
        };

        this.hidePost = this.hide.bind(this, 'post');
        this.hideUpdate = this.hide.bind(this, 'update');
        this.hideDelete = this.hide.bind(this, 'delete');
    }

    show = e => {
        this.setState({ [e.target.id]: true })
    }

    hide(id) {
        this.setState({ [id]: false });
    }

    render() {
        let isOwnProfile = this.props.username === this.props.match.params.username;
        let url = this.props.user.pictureLocation ? 'https://socialapp-api.herokuapp.com' : '';

        return (
            <div className="UserProfile">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant='top' src={url ? url + this.props.user.pictureLocation : ghostUser} />
                    
                    <Card.Header>
                        <Card.Title>
                            {this.props.user.displayName}
                        </Card.Title>
                        <Card.Subtitle>
                            @{this.props.user.username}
                        </Card.Subtitle>
                    </Card.Header>
                    
                    <Card.Body>
                        <Card.Title>
                            About me:
                        </Card.Title>
                        <Card.Text>
                            {this.props.user.about}
                        </Card.Text>
                    </Card.Body>
                    
                    {isOwnProfile &&
                        <Card.Footer>
                            <Button block id="post" variant="primary" onClick={this.show}>
                                Post A Message
                            </Button>
                            <Button block id="update" variant="primary" onClick={this.show}>
                                Update Profile
                            </Button>
                            <Button block id="delete" variant="danger" onClick={this.show}>
                                Delete Profile
                            </Button>
                        </Card.Footer>
                    }

                    <MessagePoster 
                        {...this.props}
                        show={this.state.post}
                        onClose={this.hidePost}
                    />

                    <UserUpdater
                        {...this.props}
                        show={this.state.update}
                        onClose={this.hideUpdate}
                    />

                    <UserDeleter 
                        {...this.props}
                        show={this.state.delete}
                        onClose={this.hideDelete}
                    />
                </Card>
            </div>
        );
    }
}

export default UserProfile;