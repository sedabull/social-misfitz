import React from "react";
import './MessageList.css';
import { getMessages } from '../../services/dataService';
import MessageComponent from '../messageComponent/MessageComponent';

function MessageList(props) {
    return (
        <div className="MessageList">
            <h1>Messages</h1>
            {props.messages.map(message => (
                <MessageComponent {...props} message={message} />
            ))}
        </div>
    );
}

export default MessageList;