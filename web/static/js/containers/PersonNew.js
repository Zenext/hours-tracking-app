import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { createPerson } from '../actions/people';
  
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';

class PersonNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }
  
  onFormSubmit = (event) => {
    event.preventDefault();
    
    this.props.createPerson(this.state)
      .then(this.onPersonCreated)
      .catch(this.onError);
  }

  onPersonCreated = () => {
    browserHistory.push("/people");
  }

  onError = response => {
    throw new Error(response);
  }

  onNameChange = event => {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <Box align="center"
        pad={{"vertical": "medium"}}>
        <Form>
          <Header>
            <Heading>
              Add person
            </Heading>
          </Header>
          <FormField label='Person Name'>
            <TextInput onDOMChange={this.onNameChange} />
          </FormField>
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Add' type='submit' primary={true} />
            <Box pad={{"horizontal": "medium"}}>
              <Button path="/people" label='Cancel' type='button' />
            </Box>
          </Footer>
        </Form>
      </Box>     
    )
  }
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPerson }, dispatch);
};

export default connect(null, mapDispatchToProps)(PersonNew);