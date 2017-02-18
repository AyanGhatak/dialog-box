import React from 'react';
import {render} from 'react-dom';
import DropDown from './DropDown.jsx';

class Selection extends React.Component {
  render () {
    return (
      <div>
        <div className={this.props.cls.headings}>
          {this.props.heading}
        </div>
        <div>
          <div>
            <input type="text"
            placeholder={this.props.placeholder}
            value={this.props.inputVal}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            className={this.props.cls.inputs}/>

            <button className={this.props.cls.dropDowns} onClick={this.props.dropDownCB}>&#9660;</button>
          </div>

          <DropDown cls={this.props.cls.lists} lists={this.props.lists} optionsShow={this.props.optionsShow} onClick={this.props.onClick}/>

        </div>
      </div>
    );
  }
}

export default Selection;
