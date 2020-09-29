import React from "react";
import MessageComponent from '../messageComponent/MessageComponent';

function MessageList(props) {
    return (
        <div className="MessageList">
            {props.messages.map(message => (
                <MessageComponent {...props} message={message} />
            ))}
        </div>
    );
}

export default MessageList;