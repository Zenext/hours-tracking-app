import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Sidebar from './Sidebar';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="columns">
          <Sidebar />
          {this.props.children}  
        </div>
      </MuiThemeProvider>
    );
  }
}