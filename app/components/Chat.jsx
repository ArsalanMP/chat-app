import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages : []
		};
	}

	componentDidMount() {
	    console.log('connecting to server');
	    this.socket = io.connect('http://localhost:4000');

	    this.socket.on('message' , (message) => {
	    	console.log(message);
	    	var messages = this.state.messages ;
	    	messages.push(message);
	    	this.setState({messages:messages});
	    });
  	}

  	onSendMessage(e) {
  		e.preventDefault();
  		var message = this.props.name  +" : "+ this.refs.message.value ;
  		//console.log(message);
  		this.refs.message.value = '';
  		this.socket.emit('message' , message);
  	}

  	render() {
  		var elems = this.state.messages.map((messages , index) => {
		        		return (
		        			<div key={index}>
		        				{messages}
		        			</div>
		        		);
		        	});
	    return (
	    	<div>
	    		<form onSubmit={this.onSendMessage.bind(this)}>
		          	<input placeholder='enter your message' ref='message'></input>
		          	<button>Send</button>
		        </form>
		        <ul>
		        	{elems}
		        </ul>
	      	</div>
	    );
  	}

  	renderChats() {
  		/*var rows = [];
  		console.log(this.state.messages);
	  	for (var i = 0; i < this.state.messages.length; i++) {
	  		rows.push(<li key={i}>{this.state.messages[i]}</li>);
		}
		return  (<ul>  {rows}  </ul>);*/
  	}
}