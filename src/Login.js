import React from 'react';
import css from './Login.styl';

const { Component } = React;

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
    }
  }

  onUserInput = (event) => {
    this.setState({ username: event.target.value })
  }

  onSubmitName = () => {
    this.props.setUser(this.state.username);
  }

  render(){
    return (
      <div className={css.container}>
        <input className={ css.myInput } onChange={ this.onUserInput } value={ this.state.inputValue } />
        <div className={ css.myBtn } onClick={ this.onSubmitName }>Login</div>
      </div>
    );
  }

}