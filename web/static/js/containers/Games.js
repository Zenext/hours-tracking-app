import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { fetchGames } from '../actions/game';

import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Button from 'grommet/components/Button';

class GamesContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchGames());
  }
  
  onGameSelected = (id) => {
    browserHistory.push(`/games/${id}`, [{x: 5}])
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
              <th><b>Abb</b></th>
              <th><b>Start Date</b></th>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map(game => {
              return (
                <TableRow key={game.id}
                  onClick={this.onGameSelected.bind(this, game.id)}>
                  <td>{game.title}</td>
                  <td>{game.abbrevation}</td>
                  <td>{game.start_date}</td>
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
};

export default connect(mapStateToProps)(GamesContainer);
