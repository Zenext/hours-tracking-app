import Constants from '../constants';

export default function(state = [], action) {
  switch(action.type) {
    case Constants.CREATE_NEW_GAME:
      return state.concat(action.payload);
    case Constants.GAMES_DATA_RECEIVED:
      return action.payload;
    default: return state
  }
}