export default function(state = [], action) {
  switch(action.type) {
    case 'CREATE_NEW_GAME':
      return [...state, action.payload.title];
    case 'GAMES_DATA_RECEIVED':
      console.log(action.payload)
      return action.payload;
    default: return state
  }
}