import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Notification from 'grommet/components/Notification';

import { fetchGame, updateGame, deleteGame } from '../actions/currentGame';

class GameEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.name,
      title: '',
      abbrevation: '',
      delete: false
    }

    this.props.fetchGame(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;
    this.setState({
      title: game.title,
      abbrevation: game.abbrevation
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    
    this.props.updateGame(this.props.game.id, this.state)
      .then(this.onGameUpdated);
  }

  onGameUpdated = () => {
    browserHistory.push("/games");
  }

  onGameTitleChange = event => {
    this.setState({title: event.target.value});
  }

  onAbbChange = event => {
    this.setState({abbrevation: event.target.value});
  }

  onDeleteGameClick = event => {
    this.setState({delete: true});
  }

  deleteGame = () => {
    this.props.deleteGame(this.state.id)
      .then(this.onGameDeleted)
      .catch(this.onError);
  }

  onGameDeleted = () => {
    browserHistory.push("/games");
  }

  onError = response => {
    throw new Error(response);
  }

  renderPopupDeleteBox = () => {
    if (this.state.delete) {
      return (
        <Notification status="critical"
          size="small"
          message="">
          Are you sure you want to delete the game?
          <Button label="Delete"
            onClick={this.deleteGame}/>
        </Notification>
      )
    }

    return null;
  }

  render() {
    if (!this.props.game) {
      return null
    }
    
    return (
      <Box align='center'
         pad={{"vertical": "medium"}}>
        <Form>
          <Header>
            <Heading>
              Update game
            </Heading>
          </Header>
          <FormField label='Game Name'>
            <TextInput onDOMChange={this.onGameTitleChange}
              value={this.state.title}/>
          </FormField>
          <FormField label='Abbrevation'>
            <TextInput onDOMChange={this.onAbbChange}
              value={this.state.abbrevation}/>
          </FormField>
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Update' type='submit' primary={true} />
            <Box pad={{"horizontal": "medium"}}>
              <Button path={`/games/${this.props.game.id}`} label='Cancel' type='button' />
            </Box>
            <Button icon={<TrashIcon />}
              label="Delete game"
              onClick={this.onDeleteGameClick}
              secondary={true} />
          </Footer>
        </Form>
        {this.renderPopupDeleteBox()}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.currentGame
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGame, updateGame, deleteGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEdit)