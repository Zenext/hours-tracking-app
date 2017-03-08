import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import FilterForm from '../components/game/FilterForm';

import { fetchRecords } from '../actions/record';
import InfoTable from '../components/game/InfoTable';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: "03/03/2017",
      endDate: ""
    };
  }

  componentDidMount() {
    const records = this.props.fetchRecords(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({hours: nextProps.hours});
  }

  onDateFieldChanged = (fieldName, value) => {
    this.setState({[fieldName]: value});
  }

  onUpdate = () => {
    console.log(this.state)
    this.props.fetchRecords(this.props.params.name)
  }

  getGameName = () => {
    const id = parseInt(this.props.params.name);
    return this.props.games[id - 1].title;
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
            {this.getGameName()}
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
  return bindActionCreators({ fetchRecords }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);