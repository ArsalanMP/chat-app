import React from 'react';
import css from './MessageList.styl';

const Component = React.Component;

export default class MessageList extends Component {

  constructor(prop) {
    super(prop);
  }

  render(){
    return (
      <div>
        {
          this.props.list.map(function(message, index) {
            return(
              <div>
                <div className={css.message} key={index}>{message.user +' : '+message.message}</div>
              </div>
            );
          })
        }
      </div>
    );
  }

}