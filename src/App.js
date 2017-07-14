import React from 'react';
import ChatScreen from './ChatScreen';
import Login from './Login';
import css from './App.styl'

const Component = React.Component;

export default class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      username : 'guest',
      avatar : 'https://www.jinlisting.com/wp-content/themes/pointfinder/images/empty_avatar.jpg'
    }
  }

  render(){
    return this.renderFirstPage();
  }

  setUpdate = (update) => {
    this.setState(update);
  }

  renderFirstPage = () => {
    if(this.state.username !== 'guest') {
      return (
        <ChatScreen user={{ name: this.state.username, avatar: this.state.avatar, date: Date.now() }}/>
      );
    } else {
      return (
        <Login setUpdate={this.setUpdate}/>
      );
    }
  }

}