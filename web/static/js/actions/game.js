import axios from 'axios';

const gameCreated = data => {
  return {
    type: 'CREATE_NEW_GAME',
    payload: data
  };
};

const gamesReceived = data => {
  return {
    type: 'GAMES_DATA_RECEIVED',
    payload: data
  }
};

export function createGame(data) {
  return dispatch => {
    axios.post('/api/v1/games', data)
      .then(dispatch(gameCreated(data)))
  } 
}

export function fetchGames() {
  return dispatch => {
    axios.get('/api/v1/games')
      .then(json => {
        const games = json.data.games;
        dispatch(gamesReceived(games));
      })
  }
}