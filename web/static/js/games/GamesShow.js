import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';

class GamesShow extends Component {
  render() {
    return (
      <div className="column">
        <List>
          {this.props.games.map(game => {
            return (
              <Link key={game} to={`/games/${game}`}><ListItem key={game} primaryText={game} /></Link>
            )
          })}
        </List>
        <Link className="material-icons" to="/games/new">
          <RaisedButton label="Add new game" primary={true} />
        </Link>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  };
}

export default connect(mapStateToProps)(GamesShow);