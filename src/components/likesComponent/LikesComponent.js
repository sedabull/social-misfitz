import React from "react";
import Button from 'react-bootstrap/Button';

import { addLike, deleteLike } from "../../services/dataService";

class LikesComponent extends React.Component {

    likePost = e => {
        addLike(this.props.message.id, this.props.token).then(data => {
            if(data.statusCode === 200) {
                this.props.update();
            } else {
                console.error(data.message);
            }
        });
    }

    unlikePost = e => {
        let like = this.props.message.likes.find(like => like.username === this.props.username);

        deleteLike(like.id, this.props.token).then(data => {
            if(data.statusCode === 200) {
                this.props.update();
            } else {
                console.error(data.message);
            }
        })
    }

    render() {
        let button;
        let userDidLike = false;

        if(this.props.message.likes.some(like => like.username === this.props.username)) {
            userDidLike = true;
        }
        
        if(userDidLike) {
            button = <Button size="sm" variant="secondary" onClick={this.unlikePost}>Unlike!</Button>
        } else {
            button = <Button size="sm" variant="primary" onClick={this.likePost}>Like!</Button>
        }

        return (
            <div className="LikesComponent">
                {this.props.message.likes.length} People have liked this post! {button}
            </div>
        )
    }
}

export default LikesComponent;