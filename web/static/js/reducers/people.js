import Constants from '../constants';

export default function(state = [], action) {
  switch(action.type) {
    case Constants.PERSON_CREATED:
      return state.concat(action.payload);
    case Constants.PEOPLE_DATA_RECEIVED:
      return action.payload;
    case Constants.PERSON_REMOVED:
      return state.filter(item => item.id !== action.payload.id);
    default: return state;
  }
}
