import React from "react";
import { store } from '../redux';
import Menu from "../components/menu/Menu";
import { getUser } from '../services/dataService';
import { userIsAuthenticated } from "../redux/HOCs";
import UserProfile from "../components/userProfile/UserProfile";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.updateUser();
    }

    updateUser = () => {
        getUser(this.props.match.params.username).then(data => {
            if(data.statusCode === 200) {
                this.setState({ user: data.user });
            } else {
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
