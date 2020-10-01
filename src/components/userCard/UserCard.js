import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import "./UserCard.css";
import ghostUser from '../../assets/ghostuser.png';

function UserCard(props) {
    let createDate = new Date(props.user.createdAt).toLocaleDateString();
    let url = props.user.pictureLocation ? 'https://socialapp-api.herokuapp.com' : '';

    return (
        <div className="UserCard">
            <Link to={`/profile/${props.user.username}`}>
                <Card style={{ width: "10rem" }}>
                    <Card.Img variant='top' src={url ? url + props.user.pictureLocation : ghostUser} />
                    <Card.Header>
                        <Card.Title>@{props.user.username}</Card.Title>
                        <Card.Subtitle>Joined: {createDate}</Card.Subtitle>
                    </Card.Header>
                </Card>
            </Link>
        </div>
    );
}

export default UserCard;