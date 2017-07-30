import React from 'react';
import css from './Message.styl';

const Component = React.Component;

export default class Message extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    let style = css.messageContainer;
    let { user, message, date } = this.props.message;

    if(this.props.user.name === user.name &&
       this.props.user.avatar === user.avatar)
      style = css.myMessageContainer;

    return (
      <div className={css.container}>
        <img className={css.avatar} src={user.avatar} alt={user.name}/>
        <div className={style}>
          <div className={css.username}>{user.name}</div>
          <div className={css.message}>{message}</div>
        </div>
        <div className={css.date}>{new Date(date).toLocaleString()}</div>
      </div>
    );
  }

}