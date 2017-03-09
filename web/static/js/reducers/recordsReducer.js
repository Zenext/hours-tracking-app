export default function(state = [], action) {
  switch(action.type) {
    case 'HOURS_RECEIVED':
      return action.payload;     
    default: return state
  }
}