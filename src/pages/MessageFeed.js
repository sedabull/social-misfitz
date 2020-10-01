import React from 'react'

import './MessageFeed.css' ;
import Menu from '../components/menu/Menu';
import {getMessages} from '../services/dataService'
import MessageList from '../components/messageList/MessageList';

class MessageFeed extends React.Component {
    constructor(props){
        super(props)

        this.state={
            messages:[]

        }
    }

    
    componentDidMount(){
        getMessages().then(data => {
            if(data.statusCode === 200){
                this.setState({
                    messages: data.messages
                })
            }
        })
    }

    render() {
        return (
            <div className='MessageFeed'>
                <Menu className='Menu'/>
                <MessageList messages={this.state.messages}/>
                
            
            
            </div>
        );
            
    }
}
export default MessageFeed;