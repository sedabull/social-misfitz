import React from "react";

import "./MessageList.css";
import MessageComponent from '../messageComponent/MessageComponent';

function MessageList(props) {
    return (
        <div className="MessageList">
            {props.messages.map(message => (
                <MessageComponent {...props} key={message.id} message={message} />
            ))}
        </div>
    );
}

export default MessageList;