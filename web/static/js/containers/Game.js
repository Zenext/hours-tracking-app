import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import FilterForm from '../components/game/FilterForm';
import EditIcon from 'grommet/components/icons/base/Edit';

import { getHoursByDate } from '../actions/record';
import { fetchGame } from '../actions/current_game';
import InfoTable from '../components/game/InfoTable';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: parseInt(this.props.params.name),
      title: '',
      startDate: '',
      endDate: ''
    };

    this.props.fetchGame(this.state.gameId);
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;
    
    if (!game || this.state.title.length === 0) {
      this.setState({
        title: game.title,
        startDate: game.start_date,
        endDate: new Date().toLocaleDateString("en-GB")
      });
    }
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onUpdate = () => {
    const gameId = this.state.gameId;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    
    this.props.getHoursByDate(gameId, startDate, endDate);
  }

  render() {
    if (!this.props.hours) {
      return null;
    }
    
    return (
      <Box>
        <Box align="center"
          pad="large"
          separator="bottom">
          <Heading>
            {this.state.title}&ensp;
            <Link to={`/games/${this.state.gameId}/edit`}>
              <EditIcon />
            </Link>
          </Heading>
        </Box>
        
        <Columns justify="center">
          <InfoTable hours={this.props.hours} />
          <FilterForm 
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onStartDateChange={this.onDateFieldChanged.bind(this, "startDate")}
            onEndDateChange={this.onDateFieldChanged.bind(this, "endDate")}
            onUpdate={this.onUpdate} />
        </Columns> 
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    hours: state.records.hours || state.currentGame.hours,
    game: state.currentGame
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGame, getHoursByDate }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);