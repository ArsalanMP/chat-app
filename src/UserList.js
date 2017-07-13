import React from 'react';
import User from './User'

const Component = React.Component;

export default class UserList extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    return (
      <div>
        {
          this.props.list.map((user, index)=> {
            return(
              <User key={index} currentUser={this.props.user} user={user}/>
            );
          })
        }
      </div>
    );
  }

}