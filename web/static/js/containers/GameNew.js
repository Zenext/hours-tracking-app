import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGame } from '../actions/games';
import axios from 'axios';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

class GameNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      abbrevation: '',
      start_date: new Date().toLocaleDateString("en-GB")
    };
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.createGame(this.state)
      .then(() => {
        this.context.router.push("/games");
      })
  }

  onGameTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  onAbbChange = (event) => {
    this.setState({abbrevation: event.target.value});
  }

  onDateChange = (value) => {
    this.setState({start_date: value});
  }

  render() {
    return (
      <Box align='center'
         pad={{"vertical": "medium"}}>
        <Form>
          <Header>
            <Heading>
              Add game
            </Heading>
          </Header>
          <FormField label='Game Name'>
            <TextInput onDOMChange={this.onGameTitleChange} />
          </FormField>
          <FormField label='Abbrevation'>
            <TextInput onDOMChange={this.onAbbChange} />
          </FormField>
          <FormField label='Start date'>
            <DateTime format='DD/MM/YYYY'
              onChange={this.onDateChange}
              value={this.state.start_date} />
          </FormField>
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Add' type='submit' primary={true} />
            <Box pad={{"horizontal": "medium"}}>
              <Button path="/games" label='Cancel' type='button' />
            </Box>
          </Footer>
        </Form>
      </Box>
    );
  }
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createGame }, dispatch);
}

export default connect(null, mapDispatchToProps)(GameNew);