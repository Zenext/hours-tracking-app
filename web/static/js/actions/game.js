import axios from 'axios';

const gameCreated = data => {
  return {
    type: 'CREATE_NEW_GAME',
    payload: data
  };
};

export function createGame(data) {
  return dispatch => {
    axios.post('/api/v1/games', data)
      .then(dispatch(gameCreated(data)))
  } 
}