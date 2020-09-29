import "./Users.css";
import React from "react";
import Form from "react-bootstrap/Form";
import Menu from "../components/menu/Menu";
import { getUsers } from "../services/dataService";
import { userIsAuthenticated } from "../redux/HOCs";
import UserCard from "../components/userCard/UserCard";

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            narrowUsername: ''
        }
    }

    componentDidMount() {
        this.fetchBatch(0, []);
    }

    fetchBatch(n, arr) {
        getUsers(100, 100 * n).then(data => {
            if(data.statusCode === 200) {
                arr.push(...data.users);
                if(100 * n < data.count) {
                    this.fetchBatch(n + 1, arr);
                } else {
                    this.setState({ users: [...arr] })
                }
            } else {
                console.error(data.message);
            }
        });
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="Users">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <h2>All your fellow users:</h2>
                <Form>
                    <Form.Group controlId="narrowUsername">
                        <Form.Control
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.narrowUsername}
                            placeholder="search by username..."
                        />
                    </Form.Group>
                </Form>
                <div className="flexible">
                    {this.state.users.filter(user => user.username.toLowerCase().includes(this.state.narrowUsername))
                                     .map(user => <UserCard user={user} />)}
                </div>
            </div>
        );
    }
}

export default userIsAuthenticated(Users);