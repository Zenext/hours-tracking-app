export default function(state = [], action) {
  switch(action.type) {
    case 'CREATE_NEW_GAME':
      return state.concat(action.payload);
    case 'GAMES_DATA_RECEIVED':
      return action.payload;
    default: return state
  }
}