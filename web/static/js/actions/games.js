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
    return axios.post('/api/v1/games', data)
      .then((response) => {
        dispatch(gameCreated(response.data.game))
      });
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