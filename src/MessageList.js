import React from 'react';
import Message from './Message';

const Component = React.Component;

export default class MessageList extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    return (
      <div>
        {
          this.props.list.map((message, index)=> {
            return(
              <Message message={message} user={this.props.user} key={index}/>
            );
          })
        }
      </div>
    );
  }

}