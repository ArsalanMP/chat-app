import React from 'react';
import css from './Message.styl';

const Component = React.Component;

export default class Message extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    let style = css.messageContainer ;
    if(this.props.user.name === this.props.message.user.name &&
       this.props.user.avatar === this.props.message.user.avatar)
      style = css.myMessageContainer;
    return (
      <div className={css.container}>
        <img className={css.avatar} src={this.props.message.user.avatar} alt={this.props.message.user.name}/>
        <div className={style}>
          <div className={css.username}>{this.props.message.user.name}</div>
          <div className={css.message}>{this.props.message.message}</div>
        </div>
        <div className={css.date}>{new Date(this.props.message.date).toLocaleString()}</div>
      </div>
    );
  }

}