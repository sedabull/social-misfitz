import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";

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
                <h2>Profile</h2>
            </div>
        );
    }
}

export default userIsAuthenticated(Profile);
