import React, { Component } from 'react';

export default class Profile extends Component {

	onSetName(e) {
		e.preventDefault();
		var name = this.refs.username.value ;
		this.refs.username.value = '';
		if(name.length > 0) {
			this.props.setStateUpdate({name:name});
		}
	}

	render() {
		var name = this.props.name;
	    return (
	    	<div>
	    		<h1>wellcome {name}</h1>
	      		<form onSubmit={this.onSetName.bind(this)}>
	          		<input placeholder='enter your name' ref='username'></input>
	          		<button>OK</button>
	        	</form>
	      	</div>
	    );
	}
}