import { combineReducers } from 'redux';
import games from './games';
import records from './records';
import currentGame from './currentGame';

const rootReducer = combineReducers({
  currentGame,
  games,
  records
})

export default rootReducer;