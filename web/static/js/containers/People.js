import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import Notification from 'grommet/components/Notification';
import CloseIcon from 'grommet/components/icons/base/Close';

import { deletePerson } from '../actions/people';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delete: false,
      personToDelete: {}
    }
  }

  onDeletePersonClick = person => {
    this.setState({delete: true, personToDelete: person});
  }

  deletePerson = () => {
    this.props.deletePerson(this.state.personToDelete.id)
      .then(this.onPersonDeleted)
      .catch(this.onError);
  }

  onPersonDeleted = () => {
    this.setState({
      delete: false,
      personToDelete: {}
    });
  }

  onError = response => {
    throw new Error(response);
  }

  renderPopupDeleteBox = () => {
    if (this.state.delete) {
      return (
        <Notification status="critical"
          size="small"
          message="Are you sure you want to delete this person?"
          state={this.state.personToDelete.name}>
          <br />
          <Button label="Delete"
            onClick={this.deletePerson}/>
        </Notification>
      )
    }

    return null;
  }

  render() {
    return (
      <Box pad={{"vertical": "medium"}}
        align='start'
        alignSelf='center'>
        {this.renderPopupDeleteBox()}
        <List>
          {this.props.people.map((person, index) => {
            return (
              <ListItem key={index}
                justify="between">
                <span>{person.name}</span>
                <span className="secondary list-close-icon">
                  <Button icon={<CloseIcon />}
                    onClick={this.onDeletePersonClick.bind(this, person)} />
                </span>
              </ListItem>
            ) 
          })}
        </List>
        <br />
        <Button path="/people/new" label="Add new person" primary={true} />
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