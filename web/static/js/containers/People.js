import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import TrashIcon from 'grommet/components/icons/base/Trash';
import UserAddIcon from 'grommet/components/icons/base/UserAdd';
import Select from 'grommet/components/Select';
import InfoTable from '../components/InfoTable';
import FilterForm from '../components/FilterForm';
import GamesList from '../components/GamesList';
import Columns from 'grommet/components/Columns';

import { deletePerson, fetchPersonGamesByDate } from '../actions/people';
import { getHoursByPerson } from '../actions/hours';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState(); 
  }

  getInitialState() {
    return {
      games: [],
      hours: {},
      endDate: new Date().toLocaleDateString("en-GB"),
      selectedPerson: {},
      selectedGame: {},
      deletePerson: false,
    };
  }

  onDeletePersonClick = () => {
    if (!this.state.selectedPerson.id) {
      return;
    }
    
    this.setState({deletePerson: true});
  }

  deletePerson = () => {
    this.props.deletePerson(this.state.selectedPerson.id)
      .then(this.onPersonDeleted)
      .catch(this.onError);
  }

  onPersonDeleted = () => {
    this.setState(this.getInitialState());
  }

  onSelectPerson = event => {
    const personObj = this.props.people.filter(person => person.name === event.value)[0];
    this.setState({selectedPerson: personObj, games: [], hours: {}});
  }

  onGameSelect = data => {
    const personId = this.state.selectedPerson.id;
    const endDate = this.state.endDate;
    
    getHoursByPerson(data.id, personId, data.start_date, endDate)
      .then(response => {
        this.setState({hours: response.data, selectedGame: data});
      })
      .catch(this.onError);
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onUpdate = () => {
    fetchPersonGamesByDate(this.state.selectedPerson.id, this.state.startDate, this.state.endDate)
      .then(response => {
        this.setState({games: response.data,  hours: {}});
      })
      .catch(this.onError);
  }

  onNotificationClose = () => {
    this.setState({deletePerson: false});
  }
  
  onError = response => {
    throw new Error(response);
  }

  renderContent = () => {
    if (!Object.keys(this.state.selectedPerson).length) {
      return (
        <Box alignSelf="center" pad="large">
          <h2>Select a person</h2>
        </Box>
      )
    }
    
    return (
      <Columns justify="start">
        <FilterForm 
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onStartDateChange={this.onDateFieldChanged.bind(this, "startDate")}
            onEndDateChange={this.onDateFieldChanged.bind(this, "endDate")}
            onUpdate={this.onUpdate} />
        <GamesList games={this.state.games} onGameSelect={this.onGameSelect}/>
        <InfoTable hours={this.state.hours} />
      </Columns>
    )
  }

  renderHeader = () => {
    const peopleByName = this.props.people.map(person => person.name);
    
    return (
      <Box alignSelf="center"
        pad="large"
        separator="bottom"
        direction="row">

        <Select options={peopleByName}
          value={this.state.selectedPerson.name}
          onChange={this.onSelectPerson}>
        </Select>
        
        <Button className="btn-icon" path="/people/new" icon={<UserAddIcon />} secondary={true} />
        <Button className="btn-icon"
          icon={<TrashIcon />}
          secondary={true}
          onClick={this.onDeletePersonClick}/>
      </Box>
    )
  }

  renderPopupDeleteBox = () => {
    if (this.state.deletePerson) {
      return (
        <Box pad="large">
          <Notification status="critical"
            closer={true}
            onClose={this.onNotificationClose}
            size="small"
            message="Are you sure you want to delete this person?"
            state={this.state.selectedPerson.name}>
            <br />
            <Button label="Delete"
              onClick={this.deletePerson}/>
          </Notification>  
        </Box>
      )
    }

    return null;
  }

  render() {
    if (this.props.people.length === 0) {
      return (
        <div>
          <Button className="btn-icon" path="/people/new" icon={<UserAddIcon />} secondary={true} />
          <p>No people found!</p> 
        </div>
      )
    }
    
    return (
      <Box>
        {this.renderHeader()} 
        {this.renderContent()} 
        {this.renderPopupDeleteBox()}
      </Box>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    people: state.people
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePerson }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(People);