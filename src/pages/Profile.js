import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import UserProfile from "../components/userProfile/UserProfile";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        let loginResult = JSON.parse(localStorage.getItem('login')).result;

        this.state = {
            token: loginResult.token,
            username: loginResult.username
        }
    }

    render() {
        return (
            <div className="Profile">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <UserProfile {...this.state} match={this.props.match} />
            </div>
        );
    }
}

export default userIsAuthenticated(Profile);
