import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

export default class GamesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: '',
      startDate: new Date().toLocaleDateString("en-GB")
    };
  }
  
  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.context.router.push("/games");
  }

  onGameNameChange = (event) => {
    this.setState({gameName: event.target.value});
  }

  onDateChange = (value) => {
    this.setState({startDate: value});
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
            <TextInput onDOMChange={this.onGameNameChange} />
          </FormField>
          <FormField label='Start date'>
            <DateTime format='D/M/YYYY'
              onChange={this.onDateChange}
              value={this.state.startDate} />
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