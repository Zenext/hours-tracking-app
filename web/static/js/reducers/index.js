import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import recordsReducer from './recordsReducer';
import currentGame from './currentGame';

const rootReducer = combineReducers({
  currentGame,
  games: gamesReducer,
  records: recordsReducer
})

export default rootReducer;