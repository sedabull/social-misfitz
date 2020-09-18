import React from "react";
import "./MessageComponent.css";
import Card from "react-bootstrap/Card";
import LikesComponent from "../likesComponent/LikesComponent";
import { getMessage, deleteMessage } from '../../services/dataService';


class MessageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {
                id: 0,
                text: '',
                username: '',
                createdAt: '',
                likes: []
            }
        }
    }

    componentDidMount() {
        getMessage(this.props.messageId).then(data => {
            if(data.statusCode === 200) {
                this.setState({ message: data.message });
            } else {
                console.error(data.message);
            }
        });
    }

    render() {
        let createDate = new Date(this.state.message.createdAt).toLocaleDateString();
        return (
            <Card style={{ width: '20rem' }}>
                <Card.Header>
                    <Card.Title>MessageNumber:{this.props.messageId}</Card.Title>
                    <Card.Subtitle>
                        {this.state.message.username} posted at {createDate}:
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{this.state.message.text}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <LikesComponent {...this.props} />
                </Card.Footer>
            </Card>
        );
    }
}


export default MessageComponent; 
