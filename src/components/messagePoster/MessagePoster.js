import React from 'react';
import './MessagePoster.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { createMessage } from '../../services/dataService';

class MessagePoster extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: '',
            message: ''
        };
    }

    postMessage = e => {
        e.preventDefault();

        createMessage(this.state.message, this.props.token).then(data => {
            if(data.statusCode === 200) {
                this.setState({ alert: 'Posted Successfully!', message: '' });
                setTimeout(() => this.setState({ alert: '' }), 2000);
            } else {
                console.error(data.message);
                this.setState({ alert: 'Failed to Post!' });
                setTimeout(() => this.setState({ alert: '' }), 2000);
            }
        });
    }
    
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        let alert = this.state.alert;
        return (
            <div className="MessagePoster">
                <Form onSubmit={this.postMessage}>
                    <Form.Group controlId="message">
                        <Form.Label>Create a new message:</Form.Label>
                        <Form.Control
                            required
                            rows={3}
                            as="textarea"
                            minLength={2}
                            maxLength={255}
                            value={this.state.message}
                            onChange={this.handleChange}
                            placeholder="make it count..."
                        />
                    </Form.Group>
                    <Button block type="submit" variant="primary">Tell the World!</Button>
                    {alert && <Alert variant={alert.includes('Successfully') ? 'success' : 'danger'}>{alert}</Alert>}
                </Form>
            </div>
        )
    }
}

export default MessagePoster;