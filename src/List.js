import React from 'react';
import css from './List.styl';

const Component = React.Component;

export default class List extends Component {

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