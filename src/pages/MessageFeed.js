import React from 'react'
import Menu from '../components/menu/Menu';
import './MessageFeed.css';
import MessageList from '../components/messageList/MessageList';
import { getMessages } from '../services/dataService'
import { userIsAuthenticated } from "../redux/HOCs";
import { store } from '../redux';
import Pagination from 'react-bootstrap/Pagination'

class MessageFeed extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            token: store.getState().auth.login.result.token,
            username: store.getState().auth.login.result.username,
            count: 0,
            active: 1
        }
    }


    componentDidMount() {
        this.update()
    }

    update = () => {
        getMessages('', 16, 16 * (this.state.active - 1)).then(data => {
            if (data.statusCode === 200) {
                this.setState({
                    messages: data.messages,
                    count: data.count
                })
            }
        })

    }

    handlePageChanger(pageNumber) {
        this.setState({active: pageNumber}, this.update)
    }


    render() {
        let pages;
        let pagesArray = []
        let numberOfPages = Math.ceil(this.state.count / 16)
        console.log(numberOfPages)

        for (let i = 0; i < numberOfPages; i++) {
            pagesArray.push(i + 1)
        }

        if(this.state.active < 17){
            pages = (
                <>
                    {pagesArray.slice(0,17).map(pageNumber => <Pagination.Item  onClick={this.handlePageChanger.bind(this,pageNumber)} key={pageNumber} active={this.state.active === pageNumber}>{pageNumber}</Pagination.Item>)}
                    <Pagination.Ellipsis/>
                </>
                
            )
        } else if(this.state.active > numberOfPages - 16) {
            pages = (
                <>
                    <Pagination.Ellipsis/>
                    {pagesArray.slice(numberOfPages - 16).map(pageNumber => <Pagination.Item onClick={this.handlePageChanger.bind(this,pageNumber)} key={pageNumber} active={this.state.active === pageNumber}>{pageNumber}</Pagination.Item>)}
                </>


            ) 
        } else{
            pages = (
                <>
                    <Pagination.Ellipsis/>
                    {pagesArray.filter(pageNumber => Math.abs(this.state.active - pageNumber) < 8)
                              .map(pageNumber => <Pagination.Item onClick={this.handlePageChanger.bind(this,pageNumber)} key={pageNumber} active={this.state.active === pageNumber}>{pageNumber}</Pagination.Item>)}
                    <Pagination.Ellipsis/>

                </>
            )          
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
                        <Pagination.First  onClick={this.handlePageChanger.bind(this,1)} />
                        <Pagination.Prev disabled={this.state.active === 1} onClick={this.handlePageChanger.bind(this,this.state.active - 1)}/>
                        {pages}
                        <Pagination.Next disabled={this.state.active === numberOfPages} onClick={this.handlePageChanger.bind(this,this.state.active + 1)}/>
                        <Pagination.Last onClick={this.handlePageChanger.bind(this,numberOfPages)}/>
                    </Pagination>

                </div>



            </div>
        );

    }
}
export default userIsAuthenticated(MessageFeed);