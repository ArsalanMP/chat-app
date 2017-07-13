import React from 'react';
import css from './UserList.styl';

const Component = React.Component;

export default class UserList extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    console.log(this.props.list);
    return (
      <div>
        {
          this.props.list.map(function(user, index) {
            return(
              <div>
                <div className={css.message} key={index}>{user.name }</div>
              </div>
            );
          })
        }
      </div>
    );
  }

}