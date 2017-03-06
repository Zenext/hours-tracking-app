import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Button from 'grommet/components/Button';

class GamesContainer extends Component {
  onGameSelected = (gameName) => {
    browserHistory.push(`/games/${gameName}`)
  }
  
  render() {
    return (
      <Box size='large'
        pad={{"vertical": "medium"}}
        align='start'
        alignSelf='center'>
        <Table selectable={true}>
          <thead>
            <tr>
              <th><b>Name</b></th>
              <th><b>Start Date</b></th>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map(name => {
              return (
                <TableRow key={name}
                  onClick={this.onGameSelected.bind(this, name)}>
                  <td>{name}</td>
                  <td>03/03/2017</td>
                </TableRow>
              )
            })}
          </tbody>
        </Table> 
        <Button path="/games/new" label="Add new game" primary={true} />
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(mapStateToProps)(GamesContainer);
