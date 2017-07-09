import React from 'react';
import ChatScreen from './ChatScreen';
import Login from './Login';

const Component = React.Component;

export default class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      username : 'guest'
    }
  }

  render(){
    return this.renderFirstPage();
  }

  setUser = (username)=> {
    this.setState({username : username});
  }

  renderFirstPage = () => {
    if(this.state.username !== 'guest') {
      return (
        <ChatScreen username={this.state.username}/>
      );
    } else {
      return (
        <Login setUser={this.setUser}/>
      );
    }
  }

}