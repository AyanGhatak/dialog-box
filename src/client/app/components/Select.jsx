import React from 'react';
import {render} from 'react-dom';
import SelectionComponent from './Selection.jsx';

/*
  * This component renders the header text, a selection box, a dropdown and leverage the callbacks.
*/
class Select extends React.Component {
  render () {
    var obj = {
      team: [],
      employees: []
    },
    props = this.props,
    // the comparisons are being made post trimming and lower caseing.
    teamVal = props.teamVal.trim().toLowerCase(),
    emplVal = props.emplVal.trim().toLowerCase(),
    data = props.data,
    i,
    len = data.length;

    // check if there is any team starting with it
    for (i = 0; i < len; i += 1) {
      // If we already have a prev. selected option, we just form the employee
      // array and break once we reach that row of data.
      if (props.teamSelected) {
        if (data[i].team === props.teamSelected) {

          obj.employees = data[i].employees
          .filter((str)=>{
            return str.toLowerCase().startsWith(emplVal)
          });
          break;
        }
      }
      // But in case the team is not yet selected, the team array is first formed.
      else if (data[i].team.toLowerCase().startsWith(teamVal)) {
        obj.team.push(data[i].team);
      }
    }

    return (
      <div className={this.props.cls.self}>
        {
          this.props.config.map(function (config, index) {
            var type = config.type,
              lists = [],
              i, len = data.length,
              val = config.type === 'team' ? props.teamVal : props.emplVal;
            return (
              <SelectionComponent
                key={index.toString()}
                heading={config.heading}
                onChange={config.onChange}
                onClick={config.onClick}
                onFocus={config.onFocus}
                optionsShow={config.options}
                placeholder={config.placeholder}
                lists={obj[config.type]}
                inputVal={val}
                cls = {props.cls}
                dropDownCB = {config.dropDownCB}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Select;
