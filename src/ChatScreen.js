import React from 'react';
import io from 'socket.io-client';
import css from './ChatScreen.styl';
import List from './List';

const { Component } = React;

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      inputValue: '', 
      messages : []
    }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3001');
    this.socket.emit('getAllMessages', "" ,(data) => {
      this.setState({messages : JSON.parse(data).messages });
    })
    this.socket.on('serverMessage', (msg) => {
        console.log(msg);
        let messages = this.state.messages;
        messages.push(msg);
        this.setState({messages : messages});
    })
  }

  onUserInput = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  onSendMessage = (event) => {
    let message = this.state.inputValue;
    if(message.length > 0) {
        console.log(message);
        this.socket.emit('message' , {
            message : message ,
            user : this.props.username ,
            date : Date.now()
        });
    }
  }

  render(){
    return(
        <div className={css.container}>
          <div className={css.chatForm}>
            <input className={css.myInput} onChange={ this.onUserInput } value={ this.state.inputValue } />
            <div className={css.myBtn} onClick={ this.onSendMessage }>Send</div>
          </div>
          <div className={css.listDiv}>
            <List list= {this.state.messages}/>
          </div>
        </div>
    );
  }
}