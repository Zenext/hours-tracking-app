import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import FilterForm from '../components/game/FilterForm';

import { fetchHours } from '../actions/record';
import InfoTable from '../components/game/InfoTable';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 0,
      title: '',
      startDate: '',
      endDate: ''
    };
  }
  
  componentWillReceiveProps = (nextProps) => {
    if (this.props.games.length > 0) {
      return;
    }
    
    const id = parseInt(this.props.params.name);
    const game = nextProps.games[id - 1];
    
    this.setState({
      gameId: game.id,
      title: game.title,
      startDate: game.start_date,
      endDate: new Date()
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.hours) {
      this.onUpdate();
    }
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onUpdate = () => {
    const gameId = this.state.gameId;
    const startDate = moment(this.state.startDate, "DD/MM/YYYY").format();
    const endDate = moment(this.state.endDate, "DD/MM/YYYY").format();
    
    this.props.fetchHours(gameId, startDate, endDate);
  }

  render() {
    if (!this.props.hours) {
      return <div>Loading...</div>
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
    games: state.games,
    hours: state.records.hours
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchHours }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);