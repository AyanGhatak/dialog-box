import React from 'react';
import {render} from 'react-dom';

/*
 * Creates a simple button component accepting a couple of props for classname, click handler and the content.
*/
class Button extends React.Component {
  render () {
    return (
      <div>
        <button className={this.props.cls} onClick={this.props.clickFN}>{this.props.content}</button>
      </div>
    );
  }
}

export default Button;
