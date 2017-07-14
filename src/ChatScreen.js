import React from 'react';
import io from 'socket.io-client';
import css from './ChatScreen.styl';
import MessageList from './MessageList';
import UserList from './UserList';

const { Component } = React;

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      msgText: '', 
      messages : [],
      users : []
    }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3001');

    this.socket.emit('getAllMessages', this.props.user, (data, users) => {
      this.setState({ messages: data.messages, users });
      this.refs.endoflist.scrollIntoView();
    });

    this.socket.on('onlineUsers', (users) => {
      this.setState({ users });
    });

    this.socket.on('userConnected', (user) => {
        let users = this.state.users;
        users.push(user);
        this.setState({ users: users });
    });

    this.socket.on('userDisconnected',(user) => {
        let users = this.state.users.filter(function(el) {
            return (el.name !== user.name || el.avatar !== user.avatar );
        });
        this.setState({users : users});
    });

    this.socket.on('serverMessage', (msg) => {
        let messages = this.state.messages;
        messages.push(msg);
        this.setState({messages : messages});
        this.refs.endoflist.scrollIntoView();
    });
  }

  onUserInput = (event) => {
    this.setState({ msgText: event.target.value })
  }

  onSendMessage = (event) => {
    if (event.key === 'Enter') {
      let message = this.state.msgText;
      this.setState({ msgText: '' });
      if(message.length > 0) {
          this.socket.emit('message', {
              message: message,
              user: this.props.user,
              date: Date.now()
          });
      }
    }
  }

  render(){
    return(
      <div>
        <div className={css.column}>
          <div>
            <UserList list= {this.state.users} user={this.props.user}/>
          </div>
        </div>
        <div className={css.container}>
          <div className={css.chatForm}>
            <input className={css.myInput} onKeyUp={ this.onSendMessage } onChange={ this.onUserInput } value={ this.state.msgText } placeholder='Enter your message' />
          </div>
          <div className={css.listDiv}>
            <MessageList list= {this.state.messages} user={this.props.user}/>
            <div ref='endoflist'/>
          </div>
        </div>
      </div>
    );
  }
}