import { combineReducers } from 'redux';
import gamesReducer from '../games/gamesReducer';
import recordsReducer from '../records/recordsReducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  records: recordsReducer
})

export default rootReducer;