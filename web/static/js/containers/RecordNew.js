import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { createRecord } from '../actions/records';
import workTypes from '../constants/workTypes';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

class RecordsNew extends Component {
  constructor(props) {
    super(props)
    
    this.state = this.getInitialState();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      games: nextProps.games,
      people: nextProps.people,
      selectedGame: nextProps.games[0],
      selectedWorkType: 'Dev',
      selectedPerson: nextProps.people[0]
    })
  }

  getInitialState = () => {
    const selectedGame = this.props.games[0] ? this.props.games[0] : {};
    const selectedPerson = this.props.people[0] ? this.props.people[0] : {};
    
    return {
      games: this.props.games || [],
      people: this.props.people || [],
      selectedGame: selectedGame,
      selectedWorkType: workTypes[0], 
      selectedPerson: selectedPerson,
      date: new Date().toLocaleDateString("en-GB"),
      hours: '',
    };
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    
    const params = {
      game_id: this.state.selectedGame.id,
      person_id: this.state.selectedPerson.id,
      work_type: this.state.selectedWorkType,
      date: this.state.date,
      hours: this.state.hours
    }
    
    const resp = this.props.createRecord(params)
      .then(this.onRecordAdded)
      .catch(this.onError);
  }

  onRecordAdded = response => {
    NotificationManager.success(`${this.state.hours} hours`, "Record added", 2000);
    this.setState({hours: ''});
  }

  onError = response => {
    NotificationManager.error("Try again", "Error Occured", 2000);
    throw new Error(response);
  }

  onDateFieldChange = (value) => {
    this.setState({date: value});
  }
  
  onHoursFieldChange = (event) => {
    let value = event.target.value;
    let float = parseFloat(value);
    if (isNaN(float) || value.length > 3) {
      value = "";
    } else if (float > 24) {
      value = "24";
    }
    
    this.setState({hours: value});
  }

  onGameSearch = (event) => {
    if (event.target.value.length === 0) {
      this.setState({games: this.props.games});
      return;
    }
    
    const games = this.state.games.filter(game => {
      return game.title.includes(event.target.value);
    });

    if (games.length === 0) {
      return;
    }
    
    this.setState({games});
  }
  
  onSelectGame = (event) => {
    const gameObj = this.props.games.filter(game => game.title === event.value)[0];
    this.setState({selectedGame: gameObj});
  }
  
  onSelectWorkType = event => {
    this.setState({selectedWorkType: event.value});
  }

  onSelectPerson = event => {
    const personObj = this.props.people.filter(person => person.name === event.value)[0];
    this.setState({selectedPerson: personObj}); 
  }

  render() {
    if (this.props.games.length === 0 || this.props.people.length === 0) {
      return null;
    }

    const gamesByName = this.state.games.map(game => game.title);
    const peopleByName = this.state.people.map(person => person.name);
    
    return (
      <Box align='center'
        pad={{"vertical": "medium"}}>
        <Form>
          <Header>
            <Heading>
              Add record
            </Heading>
          </Header>

          <FormField label='Game name'>
            <Select options={gamesByName}
              value={this.state.selectedGame.title}
              onChange={this.onSelectGame}
              onSearch={this.onGameSearch}>
            </Select>
          </FormField>
          
          <FormField label='Type of work'>
            <Select options={workTypes}
              value={this.state.selectedWorkType}
              onChange={this.onSelectWorkType}>
            </Select>
          </FormField>

          <FormField label='Person'>
            <Select options={peopleByName}
              value={this.state.selectedPerson.name}
              onChange={this.onSelectPerson}>
            </Select>
          </FormField>
          
          <FormField label="Date">
            <DateTime format='DD/MM/YYYY'
              onChange={this.onDateFieldChange}
              value={this.state.date} />
          </FormField>
          
          <FormField label="Hours">
            <TextInput name="hours"
              value={this.state.hours}
              onDOMChange={this.onHoursFieldChange} />
          </FormField>
          
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Add' type='submit' primary={true} />
          </Footer>
        </Form>

      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    people: state.people,
    games: state.games
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRecord }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsNew);