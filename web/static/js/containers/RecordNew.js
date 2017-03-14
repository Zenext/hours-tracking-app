import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { createRecord } from '../actions/record';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import NumberInput from 'grommet/components/NumberInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import { Notification } from 'react-notification';

const workTypes = ['Dev', 'Art', 'QA', 'PM']

class RecordsNew extends Component {
  constructor(props) {
    super(props)
    
    this.state = this.getInitialState();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      games: nextProps.games,
      selectedGame: nextProps.games[0],
      selectedWorkType: 'Dev'
    })
  }

  getInitialState = () => {
    const selectedGame = this.props.games[0] ? this.props.games[0] : {};
    
    return {
      games: this.props.games || [],
      selectedGame: selectedGame,
      selectedWorkType: workTypes[0], 
      date: new Date().toLocaleDateString("en-GB"),
      hours: '',
    };
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    
    const params = {
      game_id: this.state.selectedGame.id,
      work_type: this.state.selectedWorkType,
      date: this.state.date,
      hours: this.state.hours
    }
    
    const resp = this.props.createRecord(params)
      .then(this.onRecordAdded)
      .catch(this.onError);
  }

  onRecordAdded = response => {
    this.setState({hours: ''});
    NotificationManager.success("Record added", '', 2000);
  }

  onError = response => {
    NotificationManager.error("Try again", "Error Occured", 2000);
  }

  onDateFieldChange = (value) => {
    this.setState({date: value});
  }
  
  onHoursFieldChange = (event) => {
    let value = event.target.value;
    if (value > 24) {
      value = 24;
    } else if (value < 1) {
      value = 1
    }
    
    this.setState({hours: value});
  }

  onSelectGame = (event) => {
    const gameObj = this.props.games.filter(game => game.title === event.value)[0];
    this.setState({selectedGame: gameObj});
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

  onSelectWorkType = (event) => {
    this.setState({selectedWorkType: event.value});
  }

  render() {
    if (this.props.games.length === 0) {
      return null;
    }

    const gamesByName = this.state.games.map(game => game.title);
    
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
          
          <FormField label="Date">
            <DateTime format='DD/MM/YYYY'
              onChange={this.onDateFieldChange}
              value={this.state.date} />
          </FormField>
          
          <FormField label="Hours">
            <NumberInput name="hours"
              max={24}
              min={1}
              value={this.state.hours}
              onChange={this.onHoursFieldChange} />
          </FormField>
          
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Add' type='submit' primary={true} />
          </Footer>
        </Form>

        <NotificationContainer />
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createRecord }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsNew);