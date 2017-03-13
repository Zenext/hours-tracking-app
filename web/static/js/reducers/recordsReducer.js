import Constants from '../constants';

export default function(state = {}, action) {
  switch(action.type) {
    case Constants.HOURS_RECEIVED:
      return action.payload;     
    default: return state
  }
}