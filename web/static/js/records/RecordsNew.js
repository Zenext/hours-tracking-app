import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

  onDateFieldChange = (value) => {
    this.setState({date: value});
  }

  onPersonFieldChange = (event) => {
    this.setState({person: event.target.value});
  }

  onHoursFieldChange = (event) => {
    this.setState({hours: event.target.value});
  }

  onSelectGame = (event) => {
    this.setState({selectedGame: event.value});
  }

  onSelectWorkType = (event) => {
    this.setState({selectedWorkType: event.value});
  }

  render() {
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
            <Select options={this.props.games}
              value={this.state.selectedGame}
              onChange={this.onSelectGame}>
            </Select>
          </FormField>
          <FormField label='Type of work'>
            <Select options={this.props.workTypes}
              value={this.state.selectedWorkType}
              onChange={this.onSelectWorkType}>
            </Select>
          </FormField>
          <FormField label="Date">
            <DateTime format='D/M/YYYY'
              onChange={this.onDateFieldChange}
              value={this.state.date} />
          </FormField>
          <FormField label="Person">
            <TextInput name="person"
              value={this.state.person}
              onDOMChange={this.onPersonFieldChange} />
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
    games: state.games,
    workTypes: state.records.workTypes
  }
}

export default connect(mapStateToProps)(RecordsNew);