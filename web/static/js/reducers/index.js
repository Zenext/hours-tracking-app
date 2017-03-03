import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import recordsReducer from './recordsReducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  records: recordsReducer
})

export default rootReducer;