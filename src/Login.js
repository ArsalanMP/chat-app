import React from 'react';
import css from './Login.styl';
import toonavatar from 'cartoon-avatar';

const { Component } = React;

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: 'a',
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
      <div className={css.back}>
        <div className={css.container}>
          <div className={css.avatarContainer}>
            <img className={css.avatar} src={toonavatar.generate_avatar()} alt={this.state.username}/>
          </div>
          <div className={css.formContainer}>
            <input className={ css.myInput } onChange={ this.onUserInput } value={ this.state.inputValue } placeholder='Enter Username'/>
            <div className={ css.myBtn } onClick={ this.onSubmitName }>Login</div>
          </div>
        </div>
      </div>
    );
  }

}