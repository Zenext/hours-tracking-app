import { combineReducers } from 'redux';
import games from './games';
import hours from './hours';
import people from './people';
import currentGame from './currentGame';

const rootReducer = combineReducers({
  currentGame,
  games,
  hours,
  people
})

export default rootReducer;