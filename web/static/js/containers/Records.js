import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import RecordList from '../components/RecordList';
import PopupDelete from '../components/PopupDelete';
import workTypes from '../constants/workTypes';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import Select from 'grommet/components/Select';
import FormField from 'grommet/components/FormField';
import DateTime from 'grommet/components/DateTime';
import RevertIcon from 'grommet/components/icons/base/Revert';

class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGame: {},
      selectedPerson: {},
      records: [],
      recordsLimit: 5,
      selectedWorkType: null,
      date: null,
      recordToDelete: null,
      deleteRecord: false,
    }

    this.requestRecords();
  }

  componentDidUpdate(prevProps, prevState) {
    const game = prevState.selectedGame.id !== this.state.selectedGame.id;
    const person = prevState.selectedPerson.id !== this.state.selectedPerson.id;
    const work_type = prevState.selectedWorkType !== this.state.selectedWorkType;
    const date = prevState.date !== this.state.date;
    const limit = prevState.recordsLimit !== this.state.recordsLimit;

    if (game || person || work_type || date || limit) {
      this.requestRecords();
    }
  }

  requestRecords = () => {
    const params = {
      limit: this.state.recordsLimit,
      game_id: this.state.selectedGame.id || null,
      person_id: this.state.selectedPerson.id || null,
      work_type: this.state.selectedWorkType || null,
      date: this.state.date || null
    }
    
    axios.get('/api/v1/records', {params})
      .then(this.recordsReceived);
  }

  recordsReceived = (response) => {
    this.setState({records: response.data});
  }

  onDeleteRecordClick = (record) => {
    this.setState({deleteRecord: true, recordToDelete: record})
  }

  deleteRecord = () => {
    axios.delete(`/api/v1/records/${this.state.recordToDelete.id}`)
      .then(this.recordDeleted);
  }

  recordDeleted = (response) => {
    const records = this.state.records.filter(record => record.id !== response.data.id);
    this.setState({deleteRecord: false, records});
  }

  onNotificationClose = () => {
    this.setState({deleteRecord: false});
  }

  onSelectGame = (event) => {
    const gameObj = this.props.games.filter(game => game.title === event.value)[0];
    this.setState({selectedGame: gameObj});
  }

  onSelectPerson = (event) => {
    const personObj = this.props.people.filter(person => person.name === event.value)[0];
    this.setState({selectedPerson: personObj}); 
  }

  onSelectWorkType = (event) => {
    this.setState({selectedWorkType: event.value});
  }

  onDateFieldChange = (value) => {
    this.setState({date: value});
  }
  
  loadMoreRecords = () => {
    this.setState({recordsLimit: this.state.records.length + 5});
  }

  resetFilters = () => {
    this.setState({
      selectedGame: {},
      selectedPerson: {},
      selectedWorkType: null,
      date: null
    });
  }

  renderPopupDeleteBox = () => {
    if (this.state.deleteRecord) {
      return (
        <PopupDelete
          onNotificationClose={this.onNotificationClose}
          onDeleteButtonClick={this.deleteRecord}
          message="Are you sure you want to delete this record?" />
      )
    }

    return null;
  }

  render() {
    if (this.props.games.length === 0 || this.props.people.length === 0) {
      return null;
    }

    const gamesByName = this.props.games.map(game => game.title);
    const peopleByName = this.props.people.map(person => person.name);
    
    return (
      <Box>
        <Box direction="row"
          pad="medium"
          alignSelf="center">
            
          <Select options={gamesByName}
            placeHolder="Game"
            className="filter-field-left"
            value={this.state.selectedGame.title}
            onChange={this.onSelectGame}>
          </Select>

          <Select options={peopleByName}
            placeHolder="Person"
            className="filter-field-left"
            value={this.state.selectedPerson.name}
            onChange={this.onSelectPerson}>
          </Select>

          <Select options={workTypes}
            placeHolder="Work type"
            className="filter-field-left"
            value={this.state.selectedWorkType}
            onChange={this.onSelectWorkType}>
          </Select>

          <DateTime format='DD/MM/YYYY'
            className="filter-field-left"
            onChange={this.onDateFieldChange}
            value={this.state.date} />

          <Button onClick={this.resetFilters}
            icon={<RevertIcon />} />
        </Box>
        <Box pad={{"vertical": "medium"}}
          align='center'>
          {this.renderPopupDeleteBox()}
          <RecordList records={this.state.records}
            onDeleteRecordClick={this.onDeleteRecordClick} />
          <Button onClick={this.loadMoreRecords}
            primary={true}
            label="Load more" />
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games,
    people: state.people
  }
}

export default connect(mapStateToProps)(Records);