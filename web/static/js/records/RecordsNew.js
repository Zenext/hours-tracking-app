import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class RecordsNew extends Component {
  constructor(props) {
    super(props)
    
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      selectedGame: this.props.games[0],
      selectedWorkType: this.props.workTypes[0],
      date: new Date().toLocaleDateString("en-GB"),
      person: '',
      hours: ''
    };
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    
    this.context.router.push("/records/new");
    this.setState(this.getInitialState());
  }

  onDateFieldChange = (event) => {
    this.setState({date: event.target.value});
  }

  onPersonFieldChange = (event) => {
    this.setState({person: event.target.value});
  }

  onHoursFieldChange = (event) => {
    this.setState({hours: event.target.value});
  }

  onSelectGame = (event, key, payload) => {
    this.setState({selectedGame: payload});
  }

  onSelectWorkType = (event, key, payload) => {
    this.setState({selectedWorkType: payload});
  }

  render() {
    return (
      <div className="column is-2">
        <form onSubmit={this.onFormSubmit} className="control">
          <SelectField value={this.state.selectedGame} onChange={this.onSelectGame}>
            {this.props.games.map(game => {
              return <MenuItem key={game} value={game} primaryText={game} />
            })}
          </SelectField>

          <SelectField value={this.state.selectedWorkType} onChange={this.onSelectWorkType}>
            {this.props.workTypes.map(type => {
              return <MenuItem key={type} value={type} primaryText={type} />
            })}
          </SelectField>
          <TextField name="Date" value={this.state.date} onChange={this.onDateFieldChange} />
          <TextField name="Person" value={this.state.person} hintText="Person" onChange={this.onPersonFieldChange} />
          <TextField name="Hours" value={this.state.hours} hintText="Hours" onChange={this.onHoursFieldChange} />
          
          <RaisedButton primary={true} type="submit" label="Save record" />
        </form> 
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games,
    workTypes: state.records.workTypes
  }
}

export default connect(mapStateToProps)(RecordsNew);