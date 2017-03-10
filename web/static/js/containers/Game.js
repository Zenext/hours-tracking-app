import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import FilterForm from '../components/game/FilterForm';

import { getTotalHours, getHoursByDate } from '../actions/record';
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

    this.props.getTotalHours(this.state.gameId);
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;
    if (!game || this.state.title.length === 0) {
      this.setState({
        title: game.title,
        startDate: moment(game.start_date).format("DD/MM/YYYY"),
        endDate: new Date()
      });
    }
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onUpdate = () => {
    const gameId = this.state.gameId;
    const startDate = moment(this.state.startDate, "DD/MM/YYYY").format();
    const endDate = moment(this.state.endDate, "DD/MM/YYYY").format();
    
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
            {this.state.title}
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
    hours: state.records.hours,
    game: state.records.game
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTotalHours, getHoursByDate }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);