import React from 'react'
import Menu from '../components/menu/Menu';
import MessageComponent from '../components/messageComponent/MessageComponent';
import MessageList from '../components/messageList/MessageList';
import {getMessages} from '../services/dataService'

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
                <Menu/>
                <MessageList messages={this.state.messages}/>
                
            
            
            </div>
        );
            
    }
}
export default MessageFeed;