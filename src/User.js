import React from 'react';
import css from './User.styl';

const Component = React.Component;

export default class User extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    let style = css.container ;
    if(this.props.currentUser.name === this.props.user.name && this.props.currentUser.avatar === this.props.user.avatar)
      style = css.selectedContainer;
    return (
      <div className={style}>
        <img className={css.avatar} src={this.props.user.avatar} alt={this.props.user.name}/>
        <div className={css.textContainer}>
          <div className={css.username}>{this.props.user.name}</div>
          <div className={css.date}>Connected at {new Date(this.props.user.date).toLocaleTimeString()}</div>
        </div>
      </div>
    );
  }

}