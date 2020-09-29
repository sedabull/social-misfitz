import './Profile.css';
import React from "react";
import { store } from '../redux';
import Menu from "../components/menu/Menu";
import { getUser, getMessages } from '../services/dataService';
import { userIsAuthenticated } from "../redux/HOCs";
import UserProfile from "../components/userProfile/UserProfile";
import MessageList from "../components/messageList/MessageList";
import MessagePoster from "../components/messagePoster/MessagePoster";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: store.getState().auth.login.result.token,
            username: store.getState().auth.login.result.username,
            messages: [],
            user: {
                pictureLocation: '',
                username: '',
                displayName: '',
                about: '',
                googleId: null,
                createdAt: '',
                updatedAt: ''
            }
        }
    }

    componentDidMount() {
        this.updateUser();
        this.updateMessages();
    }

    updateUser = () => {
        let username = this.props.match.params.username;

        getUser(username).then(data => {
            if(data.statusCode === 200) {
                this.setState({ user: data.user })
            } else {
                console.error(data.message);
                this.setState({
                    user: {
                        pictureLocation: '',
                        username: '',
                        displayName: 'NO SUCH USER!',
                        about: 'THIS USER DOES NOT EXIST!',
                        googleId: null,
                        createdAt: '',
                        updatedAt: ''
                    }
                });
            }
        });
    }

    updateMessages = () => {
        let username = this.props.match.params.username;
        
        getMessages(username).then(data => {
            if(data.statusCode === 200) {
                this.setState({ messages: data.messages })
            } else {
                console.error(data.message);
            }
        });
    }

    render() {
        return (
            <div className="Profile">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <div className="flex-row">
                    <div>
                        <UserProfile {...this.state} match={this.props.match} update={this.updateUser} />
                        {this.state.username === this.props.match.params.username && 
                        <MessagePoster {...this.state} update={this.updateMessages} />}
                    </div>
                    <MessageList {...this.state} update={this.updateMessages} />
                </div>
            </div>
        );
    }
}

export default userIsAuthenticated(Profile);
