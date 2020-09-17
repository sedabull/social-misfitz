import React from "react";
import { getMessage, addLike, deleteLike } from "../../services/dataService";
import Button from 'react-bootstrap/Button';

class LikesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {
                id: 0,
                text: '',
                username: '',
                createdAt: '',
                likes: []
            },
            like: {
                id: 0,
                username: '',
                messageId: 0,
                createdAt: ''
            }
        };
    }

    componentDidMount() {
        getMessage(this.props.messageId).then(data => {
            this.setState({ message: data.message });
            if(data.message.likes.some(like => like.username === this.props.username)) {
                let like = data.message.likes.find(like => like.username === this.props.username);
                this.setState({ like })
            }
        })
    }

    likePost = e => {
        addLike(this.props.messageId, this.props.token).then(likeData => {
            getMessage(this.props.messageId).then(messageData => {
                this.setState({ message: messageData.message, like: likeData.like });
            })
        })
    }

    unlikePost = e => {
        deleteLike(this.state.like.id, this.props.token).then(data => {
            if(data.statusCode === 200) {
                getMessage(this.props.messageId).then(data => {
                    this.setState({
                        message: data.message,
                        like: {
                            id: 0,
                            username: '',
                            messageId: 0,
                            createdAt: ''
                        }
                    })
                })
            } else {
                console.error(data);
            }
        })
    }

    render() {
        let button;
        if(this.state.like.id) {
            button = <Button size="sm" variant="danger" onClick={this.unlikePost}>Unlike!</Button>
        } else {
            button = <Button size="sm" variant="primary" onClick={this.likePost}>Like!</Button>
        }

        return (
            <div className="LikesComponent">
                {this.state.message.likes.length} People have liked this post! {button}
            </div>
        )
    }
}

export default LikesComponent;