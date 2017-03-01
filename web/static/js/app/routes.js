import React from 'react';
import { Route } from 'react-router';

import App from './App';
import RecordsNew from '../records/RecordsNew';
import GamesShow from '../games/GamesShow';
import GamesNew from '../games/GamesNew';

export default (
  <Route path="/" component={App}>
    <Route path="records/new" component={RecordsNew} />
    <Route path="games" component={GamesShow} />
    <Route path="games/new" component={GamesNew} />
  </Route>
);