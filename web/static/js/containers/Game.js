import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';

import { fetchRecords } from '../actions/record';
import { gameInfoTable } from '../components/GameInfoTable';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: {}
    };
  }

  componentDidMount() {
    const records = this.props.fetchRecords(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({hours: nextProps.hours});
  }

  render() {
    return (
      <Box>
        <Header>
          <Heading>
            Diamond Bonanza
          </Heading>
        </Header>

       <Tabs>
         <Tab title='Total'>
            {gameInfoTable(this.state.hours)}
         </Tab>
         <Tab title='By sprint'>
           Sprint
         </Tab>
         <Tab title="By time interval">
           Choose interval
         </Tab>
       </Tabs>
        
        
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    hours: state.records.hours
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRecords }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);