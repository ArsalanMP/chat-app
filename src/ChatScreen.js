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

    this.socket.emit('getAllMessages', this.props.user ,(data , users) => {
      this.setState({messages : JSON.parse(data).messages , users : users });
    });

    this.socket.on('onlineUsers',(data) => {
      this.setState({users : data });
    });

    this.socket.on('userConnected',(user) => {
        let users = this.state.users;
        users.push(user);
        this.setState({users : users});
    });

    this.socket.on('userDisconnected',(user) => {
        console.log(user.name + " dic")
        let users = this.state.users;
        var index = users.indexOf(user);
        if(index > -1) {
          users.splice(index , 1);
        }
        this.setState({users : users});
    });

    this.socket.on('serverMessage', (msg) => {
        let messages = this.state.messages;
        messages.push(msg);
        this.setState({messages : messages});
    });
  }

  onUserInput = (event) => {
    this.setState({ msgText: event.target.value })
  }

  onSendMessage = (event) => {
    if (event.key === 'Enter') {
      let message = this.state.msgText;
      if(message.length > 0) {
          this.socket.emit('message' , {
              message : message ,
              user : this.props.user ,
              date : Date.now()
          });
      }
    }
  }

  render(){
    return(
      <div>
        <div className={css.column}>
          <div>
            Online users
            <UserList list= {this.state.users}/>
          </div>
        </div>
        <div className={css.container}>
          <div className={css.chatForm}>
            <input className={css.myInput} onKeyUp={ this.onSendMessage } onChange={ this.onUserInput } value={ this.state.msgText } placeholder='Enter your message' />
          </div>
          <div className={css.listDiv}>
            <MessageList list= {this.state.messages}/>
          </div>
        </div>
      </div>
    );
  }
}