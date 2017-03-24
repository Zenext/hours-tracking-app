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

import { getHoursByDate } from '../actions/hours';
import { fetchGame } from '../actions/currentGame';
import InfoTable from '../components/game/InfoTable';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: parseInt(this.props.params.name),
      title: '',
      startDate: '',
      endDate: '',
      hours: {dev: 0, design: 0, animations: 0, art: 0, qa: 0, pm: 0},
    };

    this.props.fetchGame(this.state.gameId);
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;
    
    if (game.title && this.state.title.length === 0) {
      this.setState({
        title: game.title,
      });
    }
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onTotalButtonClick = () => {
    const game = this.props.game;
    this.setState({
      startDate: game.start_date,
      endDate: new Date().toLocaleDateString("en-GB")
    });
  }

  onUpdate = () => {
    const gameId = this.state.gameId;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    
    this.props.getHoursByDate(gameId, startDate, endDate)
      .then(response => {
        this.setState({hours: response.data});
      })
  }

  render() {
    if (!this.props.game) {
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
          <InfoTable hours={this.state.hours} />
          <FilterForm 
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onStartDateChange={this.onDateFieldChanged.bind(this, "startDate")}
            onEndDateChange={this.onDateFieldChanged.bind(this, "endDate")}
            onUpdate={this.onUpdate}
            onTotalButtonClick={this.onTotalButtonClick} />
        </Columns> 
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    game: state.currentGame
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGame, getHoursByDate }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);