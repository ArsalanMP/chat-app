import React, { Component } from 'react';
import Profile from './Profile';
import Chat from './Chat';

export default class Container extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name : '' ,
		};
	}

	setStateUpdate(update) {
		this.setState (update);
	}

  	render() {
	    return (
	    	<div>
	      		<Profile name={this.state.name} setStateUpdate={this.setStateUpdate.bind(this)}></Profile>
	      		<Chat name={this.state.name}></Chat>
	      	</div>
	    );
  	}
}