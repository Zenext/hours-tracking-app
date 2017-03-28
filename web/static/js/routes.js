import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';

import Games from './containers/Games';
import Game from './containers/Game';
import GameNew from './containers/GameNew';
import GameEdit from './containers/GameEdit';
import Records from './containers/Records';
import RecordNew from './containers/RecordNew';
import People from './containers/People';
import PersonNew from './containers/PersonNew';

export default (
  <Route path="/" component={App}>
    <Route path="/records" component={Records} />
    <Route path="/records/new" component={RecordNew} />
    
    <Route path="/games" component={Games} />
    <Route path="/games/new" component={GameNew} />
    <Route path="/games/:name" component={Game} />
    <Route path="/games/:name/edit" component={GameEdit} />

    <Route path="/people" component={People} />
    <Route path="/people/new" component={PersonNew} />
  </Route>
);