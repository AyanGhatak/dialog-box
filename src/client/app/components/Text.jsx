import React from 'react';
import {render} from 'react-dom';

class Text extends React.Component {
  render () {
    return (
      <div className={this.props.cls}>{this.props.content} </div>
    );
  }
}

export default Text;
