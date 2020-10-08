import React from "react";
import Pagination from "react-bootstrap/Pagination";

import './Profile.css';
import { store } from '../redux';
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import { getUser, getMessages } from '../services/dataService';
import UserProfile from "../components/userProfile/UserProfile";
import MessageList from "../components/messageList/MessageList";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            active: 1,
            messages: [],
            token: store.getState().auth.login.result.token,
            username: store.getState().auth.login.result.username,
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
        this.update();
    }

    update = () => {
        let username = this.props.match.params.username;
        
        this.updateUser(username);
        this.updateMessages(username);
    }

    updateUser = (username) => {
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

    updateMessages = (username) => {
        getMessages(username, 12, 12 * (this.state.active - 1)).then(data => {
            if(data.statusCode === 200) {
                this.setState({ messages: data.messages, count: data.count });
            } else {
                console.error(data.message);
            }
        });
    }

    next = () => {
        if(12 * this.state.active < this.state.count) {
            this.setState(state => ({ active: state.active + 1 }), this.update);
        }
    }

    prev = () => {
        if(this.state.active > 1) {
            this.setState(state => ({ active: state.active - 1 }), this.update);
        }
    }

    first = () => {
        this.setState({ active: 1 }, this.update);
    }

    last = () => {
        this.setState(state => ({ active: Math.ceil(state.count / 12) }), this.update);
    }

    render() {
        return (
            <div className="Profile">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <main>
                    <UserProfile {...this.state} match={this.props.match} update={this.update} />
                    <div>
                        {this.state.messages.length > 0 && <div className="Centered">
                            <Pagination size="lg">
                                <Pagination.First
                                    onClick={this.first}
                                    disabled={this.state.active === 1}
                                />
                                <Pagination.Prev
                                    onClick={this.prev}
                                    disabled={this.state.active === 1}
                                />
                                <Pagination.Item active>{this.state.active}</Pagination.Item>
                                <Pagination.Next
                                    onClick={this.next}
                                    disabled={12 * this.state.active > this.state.count}
                                />
                                <Pagination.Last
                                    onClick={this.last}
                                    disabled={this.state.active === Math.ceil(this.state.count / 12)}
                                />
                            </Pagination>
                        </div>}
                        <div className="message-body">
                            {this.state.messages.length > 0 && <MessageList
                                update={this.update}
                                token={this.state.token}
                                username={this.state.username}
                                messages={this.state.messages.slice(0, 4)}
                            />}
                            {this.state.messages.length > 4 && <MessageList
                                update={this.update}
                                token={this.state.token}
                                username={this.state.username}
                                messages={this.state.messages.slice(4, 8)}
                            />}
                            {this.state.messages.length > 8 && <MessageList
                                update={this.update}
                                token={this.state.token}
                                username={this.state.username}
                                messages={this.state.messages.slice(8, 12)}
                            />}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default userIsAuthenticated(Profile);
