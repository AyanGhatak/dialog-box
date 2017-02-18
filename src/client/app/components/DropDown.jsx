import React from 'react';
import {render} from 'react-dom';

class DropDown extends React.Component {
  render () {
    var clickFN = this.props.onClick,
      cls = this.props.cls;
    return (
      <div className={cls + '_container'} style={{display: this.props.optionsShow ? 'block' : 'none' }}>
        {
          this.props.lists.map(function (list, index) {
            return (
              <div className={cls} key={index.toString()} onClick={clickFN}>
                {list}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default DropDown;
