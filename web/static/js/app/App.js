import React, { Component } from 'react';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from './Sidebar';

export default class Application extends Component {
  render() {
    return (
      <App centered={false}>
        <Split flex='right'>
          <Sidebar />
          <Box>
            {this.props.children}
          </Box>
        </Split>
      </App>
    );
  }
}