import React from "react";
import "./MessageComponent.css";
import Card from "react-bootstrap/Card";


function MessageComponent(props) {
  return (<Card>
    <Card.Title>MessageNumber:{props.id}</Card.Title>;
    <Card.Text>stringMessage:{props.text}</Card.Text>
    <Card.Text>string:{props.username}</Card.Text>
    <Card.Text>date-time:{props.CreatedAt}</Card.Text>
    <Card.Text>number-likes:{props.likes}</Card.Text>
  </Card>
  )
}


export default MessageComponent; 
