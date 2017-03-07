const initialState = ['Diamond Bonanza', 'Pirates Plunder', 'Triple Win Cafe', 'Fun of The Fair'];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_NEW_GAME':
      return state = [...state, action.payload.title];
    default: return state
  }
}