import React from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  paper: {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
  },
  menuItem: {
    textDecoration: 'none'
  }
};

export default function() {
  return (
    <div className="column is-one-third">
      <Paper style={styles.paper}>
        <Menu>
          <Link style={styles.menuItem} to="/"><MenuItem animation={null} primaryText="Home"></MenuItem></Link>
          <Link style={styles.menuItem} to="/games"><MenuItem primaryText="Games"></MenuItem></Link>
          <Link style={styles.menuItem} to="/records/new"><MenuItem primaryText="New Record"></MenuItem></Link>
        </Menu>  
      </Paper>  
    </div>
  );
}