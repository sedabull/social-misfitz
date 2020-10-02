import React from "react";
import Form from "react-bootstrap/Form";

import "./Users.css";
import Menu from "../components/menu/Menu";
import { getUsers } from "../services/dataService";
import { userIsAuthenticated } from "../redux/HOCs";
import UserCard from "../components/userCard/UserCard";

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            search: ''
        }
    }

    componentDidMount() {
        let fetchBatch = (n, arr) => {
            getUsers(100, 100 * n).then(data => {
                if(data.statusCode === 200) {
                    arr.push(...data.users);
                    
                    if(100 * n < data.count) {
                        fetchBatch(n + 1, arr);
                    } else {
                        this.setState({ users: arr })
                    }
                } else {
                    console.error(data.message);
                }
            });
        }

        fetchBatch(0, []);
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        let users = this.state.users.filter(user => user.username.toLowerCase().includes(this.state.search));

        return (
            <div className="Users">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <h2>{this.state.search ? "Some" : "All"} {users.length} of your fellow users:</h2>
                <Form>
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.search}
                            placeholder="search by username..."
                        />
                    </Form.Group>
                </Form>
                <div className="flexible">
                    {users.map((user, index) => <UserCard key={index} user={user} />)}
                </div>
            </div>
        );
    }
}

export default userIsAuthenticated(Users);