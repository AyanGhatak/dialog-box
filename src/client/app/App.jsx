import React from 'react';
import {render} from 'react-dom';
import Button from './components/Button.jsx';
import Text from './components/Text.jsx';
import data from './data.js';
import Select from './components/Select.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  // Fetches the initial state for the application.
  // Also useful in resetting the app state.
  getInitialState() {
    return {
      team: {
        show: false,
        value: '',
        selected: ''
      },
      employees: {
        show: false,
        value: '',
        selected: ''
      },
      errors: {
        text: '',
        show: false
      }
    };
  }

  // @ todo: Need to validate and fix for touch devices.
  // @ todo: Need to be responsive design.

  /*
    * This is a callback for the onChange event in the input boxes.
    * @param name - Team/ Employees.
    * @param e - The synthetic mouse event.
  */
  handleChange(name, e) {
    var change = {},
      obj = this.state,
      affected = obj[name];
    // The value of the input box.
    affected.value = e.target.value;
    // resets any previous selection
    affected.selected = '';
    // and sets the visibility to true.
    affected.show = true;
    obj.errors.show && (obj.errors.show = !obj.errors.show);
    // If the team is being set, the employees, as its dependant, is reset.
    if (name === 'team') {
      obj.employees.value = '';

    }
    // set the modified state.
    this.setState(obj);
  }

  /*
    * The handler when the child list is being clicked.
  */
  clickFN(name, e) {
    var obj = this.state,
      affected = obj[name],
      value = e.target.innerHTML; // fetches the content of the input tag.
    // That becomes the selection as well the text to be shown in input box.
    affected.value = affected.selected = value;
    // The child list is to be folded now.
    affected.show = false;
    obj.errors.show && (obj.errors.show = !obj.errors.show);
    this.setState(obj);
  }

  /*
   * An event handler when the input boxes are brought to in focus.
  */
  onFocus(name, e) {
    var obj = this.state,
      affected = obj[name];
    affected.show = true;
    obj.errors.show && (obj.errors.show = !obj.errors.show);
    this.setState(obj);
  }

  /*
   * The handler to handle click in the drop down arrow button.
  */
  onDropDownClick(name, e) {
    var obj = this.state,
      affected = obj[name];
    // visibility is being toggled here.
    affected.show = !affected.show;
    obj.errors.show && (obj.errors.show = !obj.errors.show);
    this.setState(obj);
  }

  /*
    The handler for the click interaction in the OK button.
  */
  submittingFN() {
    var state = this.state,
      team = state.team,
      employees = state.employees,
      errorText;
    // there is some no empty value in the input box, yet nothing is selected.
    // Error text is being forwarded.
    if (team.value !== '' && team.selected === '') {
      errorText = 'Please select a valid team!'
    }
    else if (employees.value !== '' && employees.selected === '') {
      errorText = 'Please select a valid employee name.'
    }
    if (errorText) {
      state.errors.text = errorText;
      state.errors.show = true;
      this.setState(state);
    }
    else {
      // resets the state.
      this.setState(this.getInitialState());
    }
  }

  /*
   * The handler for both the cross and cancel button.
  */
  closingFN() {
    var state = this.state,
      team = state.team,
      employees = state.employees;

    if(team.value !== '' || employees !== '') {
      // alrets a confiration window for the user input.
      if(confirm("Do you really want to leave?")) {
        this.setState(this.getInitialState());
      }
    }
  }
  // So all the callbacks, and states are being passed to the components
  // via prop. This ensures the uni-directional flow.
  render () {
    var state = this.state;
    return (
      <div className='container'>
        <Button cls='right cross' content='X' clickFN={this.closingFN.bind(this)}/>
        <Text cls='header' content='Select an Employee' />

        <input type="checkbox" className='checkbox' checked='true'/>
        <Text cls='email' content='Send welcome email to employee' />

        <Select config={[{
          heading: 'Select a team in the organisation',
          placeholder: 'Select Team...',
          type: 'team',
          options: state.team.show,
          onChange: this.handleChange.bind(this, 'team'),
          onClick: this.clickFN.bind(this, 'team'),
          onFocus: this.onFocus.bind(this, 'team'),
          dropDownCB: this.onDropDownClick.bind(this, 'team')
        },{
          heading: 'Select an Employee',
          placeholder: 'Select Employee...',
          type: 'employees',
          options: state.employees.show,
          onChange: this.handleChange.bind(this, 'employees'),
          onClick: this.clickFN.bind(this, 'employees'),
          onFocus: this.onFocus.bind(this, 'employees'),
          dropDownCB: this.onDropDownClick.bind(this, 'employees')
        }]}
        data= {data}
        teamVal={state.team.value}
        emplVal={state.employees.value}
        teamSelected={state.team.selected}
        cls={{
          self: 'selections',
          headings: 'headings',
          inputs: 'inputs',
          dropDowns: 'dropDowns',
          lists: 'lists'
        }}/>

        <div className='errors' style={{display: state.errors.show ? 'block' : 'none' }}>{state.errors.text}</div>

        <Button cls='actions ok' content='OK' clickFN={this.submittingFN.bind(this)}/>
        <Button cls='actions cancel' content='Cancel' clickFN={this.closingFN.bind(this)}/>
      </div>
    );
  }
}

export default App;
