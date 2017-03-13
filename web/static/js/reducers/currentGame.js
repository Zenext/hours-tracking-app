export default function(state = {}, action) {
  switch(action.type) {
    case 'GAME_DATA_RECEIVED':
      return action.payload;
    default: return state
  }
}