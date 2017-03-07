import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'grommet/scss/vanilla/index.scss';

import { initApp } from './actions';
import rootReducer from './reducers';
import routes from './routes';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

store.dispatch(initApp());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);