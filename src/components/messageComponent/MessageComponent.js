import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./MessageComponent.css";
import LikesComponent from "../likesComponent/LikesComponent";
import { deleteMessage } from '../../services/dataService';

class MessageComponent extends React.Component {

    deleteSelf = () => {
        deleteMessage(this.props.message.id, this.props.token).then(data => {
            if(data.statusCode === 200) {
                this.props.update();
            } else {
                console.error(data.message);
            }
        });
    }

    render() {
        let badge = null;
        let createDate = new Date(this.props.message.createdAt).toLocaleDateString();

        if(this.props.username === this.props.message.username) {
            badge = <Badge variant="danger" onClick={this.deleteSelf}>X</Badge>
        }

        return (
            <div className="MessageComponent">
                <Card style={{ width: '20rem' }}>
                    <Card.Header>
                        <Card.Title>
                            MessageNumber: {this.props.message.id}
                            {badge}
                        </Card.Title>
                        <Card.Subtitle>
                            @{this.props.message.username} posted on {createDate}:
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{this.props.message.text}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <LikesComponent {...this.props} />
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}


export default MessageComponent; 
