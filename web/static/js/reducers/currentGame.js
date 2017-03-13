import Constants from '../constants';

export default function(state = {}, action) {
  switch(action.type) {
    case Constants.GAME_DATA_RECEIVED:
      return action.payload;
    default: return state
  }
}