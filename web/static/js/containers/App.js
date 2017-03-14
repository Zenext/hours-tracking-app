import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from '../components/Sidebar';

export default class Application extends Component {
  render() {
    return (
      <App centered={false}>
        <Split flex='right'>
          <Sidebar />
          <Box>
            {this.props.children}
            <NotificationContainer />
          </Box>
        </Split>
      </App>
    );
  }
}