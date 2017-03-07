export default function(state = [], action) {
  switch(action.type) {
    case 'RECORDS_RECEIVED':
      return action.payload;     
    default: return state
  }
}