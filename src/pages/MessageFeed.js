import React from 'react'

import './MessageFeed.css';
import { store } from '../redux';
import Menu from '../components/menu/Menu';
import { userIsAuthenticated } from "../redux/HOCs";
import Pagination from 'react-bootstrap/Pagination';
import { getMessages } from '../services/dataService';
import MessageList from '../components/messageList/MessageList';

class MessageFeed extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            active: 1,
            messages: [],
            token: store.getState().auth.login.result.token,
            username: store.getState().auth.login.result.username
        }
    }


    componentDidMount() {
        this.update();
    }

    update = () => {
        getMessages('', 16, 16 * (this.state.active - 1)).then(data => {
            if (data.statusCode === 200) {
                this.setState({
                    count: data.count,
                    messages: data.messages
                });
            } else {
                console.error(data.message);
            }
        });
    }

    handlePageChanger(pageNumber) {
        this.setState({active: pageNumber}, this.update)
    }

    render() {
        let pages;
        let pagesArray = [];
        let numberOfPages = Math.ceil(this.state.count / 16);

        for (let i = 0; i < numberOfPages; i++) {
            pagesArray.push(i + 1);
        }

        if(this.state.active < 17){
            pages = (
                <>
                    {pagesArray.slice(0,17)
                               .map(pageNumber => <Pagination.Item
                                                    key={pageNumber}
                                                    active={this.state.active === pageNumber}
                                                    onClick={this.handlePageChanger.bind(this, pageNumber)}>
                                                        {pageNumber}
                                                    </Pagination.Item>)}
                    <Pagination.Ellipsis/>
                </>  
            );
        } else if(this.state.active > numberOfPages - 16) {
            pages = (
                <>
                    <Pagination.Ellipsis/>
                    {pagesArray.slice(numberOfPages - 16)
                               .map(pageNumber => <Pagination.Item
                                                    key={pageNumber}
                                                    active={this.state.active === pageNumber}
                                                    onClick={this.handlePageChanger.bind(this, pageNumber)}>
                                                        {pageNumber}
                                                    </Pagination.Item>)}
                </>
            );
        } else{
            pages = (
                <>
                    <Pagination.Ellipsis/>
                    {pagesArray.filter(pageNumber => Math.abs(this.state.active - pageNumber) < 8)
                               .map(pageNumber => <Pagination.Item
                                                    key={pageNumber}
                                                    active={this.state.active === pageNumber}
                                                    onClick={this.handlePageChanger.bind(this, pageNumber)}>
                                                        {pageNumber}
                                                  </Pagination.Item>)}
                    <Pagination.Ellipsis/>
                </>
            );
        }

        return (
            <div className='MessageFeed'>
                <Menu isAuthenticated={this.props.isAuthenticated} />
                
                <div className='flexible'>
                    <MessageList update={this.update} token={this.state.token} username={this.state.username} messages={this.state.messages.slice(0, 4)} />
                    <MessageList update={this.update} token={this.state.token} username={this.state.username} messages={this.state.messages.slice(4, 8)} />
                    <MessageList update={this.update} token={this.state.token} username={this.state.username} messages={this.state.messages.slice(8, 12)} />
                    <MessageList update={this.update} token={this.state.token} username={this.state.username} messages={this.state.messages.slice(12, 16)} />
                </div>

                <div className='Centered'>
                    <Pagination size='lg'>
                        <Pagination.First  onClick={this.handlePageChanger.bind(this, 1)} />
                        <Pagination.Prev disabled={this.state.active === 1} onClick={this.handlePageChanger.bind(this, this.state.active - 1)}/>
                        {pages}
                        <Pagination.Next disabled={this.state.active === numberOfPages} onClick={this.handlePageChanger.bind(this, this.state.active + 1)}/>
                        <Pagination.Last onClick={this.handlePageChanger.bind(this, numberOfPages)} />
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default userIsAuthenticated(MessageFeed);