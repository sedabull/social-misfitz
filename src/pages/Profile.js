import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import UserProfile from "../components/userProfile/UserProfile";
import { getUser } from '../services/dataService';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        let loginResult = JSON.parse(localStorage.getItem('login')).result;

        this.state = {
            token: loginResult.token,
            username: loginResult.username,
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
    }

    updateUser = () => {
        getUser(this.props.match.params.username).then(data => {
            this.setState({ user: data.user });
        });
    }

    render() {
        return (
            <div className="Profile">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <UserProfile {...this.state} match={this.props.match} update={this.updateUser} />
            </div>
        );
    }
}

export default userIsAuthenticated(Profile);
