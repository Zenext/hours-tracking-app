import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Headline from 'grommet/components/Headline';

export default class GamesList extends Component {
  constructor(props) {
    super(props);
  }

  renderNoGamesFound =() => {
    return (
      <Box pad="large">
          <p><b>No games found for given time interval.</b></p>
      </Box>
    )
  }

  render() {
    if (!this.props.games.length) {
      return this.renderNoGamesFound();
    }
    
    return (
      <Box pad="large">
        <List selectable={true}>
          {this.props.games.map(game => {
            return (
              <ListItem key={game.id}
                onClick={this.props.onGameSelect.bind(this, game)}>
                <span>{game.title}</span>
              </ListItem>
            )
          })}
        </List>  
      </Box>
    )
  }
}