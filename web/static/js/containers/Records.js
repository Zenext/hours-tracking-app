import React, { Component } from 'react';
import axios from 'axios';

import RecordList from '../components/RecordList';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

export default class Records extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [],
      recordsLimit: 5
    }

    this.loadMoreRecords();
  }

  loadMoreRecords = () => {
    const params = {limit: this.state.recordsLimit};
    axios.get('/api/v1/records', {params})
      .then(this.recordsReceived);
  }

  recordsReceived = (response) => {
    this.setState({records: response.data, recordsLimit: this.state.recordsLimit + 5});
  }

  render() {
    return (
      <Box pad={{"vertical": "medium"}}
        align='center'>
        <RecordList records={this.state.records} />
        <Button onClick={this.loadMoreRecords}
          primary={true}
          label="Load more" />
      </Box>
    )
  }
}