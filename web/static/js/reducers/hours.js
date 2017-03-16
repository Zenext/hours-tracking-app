import Constants from '../constants';

const initialState = {
  animations: 0,
  design: 0,
  dev: 0,
  pm: 0,
  qa: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case Constants.HOURS_RECEIVED:
      return action.payload;     
    default: return state
  }
}