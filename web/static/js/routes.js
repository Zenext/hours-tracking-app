import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';

import Games from './containers/Games';
import GameNew from './containers/GameNew';
import RecordNew from './containers/RecordNew';

export default (
  <Route path="/" component={App}>
    <Route path="/records/new" component={RecordNew} />
    <Route path="/games" component={Games} />
    <Route path="/games/:name" component={GameNew} />
    <Route path="/games/new" component={GameNew} />
  </Route>
);