import { combineReducers } from 'redux';
import games from './games';
import hours from './hours';
import currentGame from './currentGame';

const rootReducer = combineReducers({
  currentGame,
  games,
  hours
})

export default rootReducer;