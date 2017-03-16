import axios from 'axios';
import Constants from '../constants';

const gameCreated = data => {
  return {
    type: Constants.CREATE_NEW_GAME,
    payload: data
  };
};

const gamesReceived = data => {
  return {
    type: Constants.GAMES_DATA_RECEIVED,
    payload: data
  }
};

export function createGame(data) {
  return dispatch => {
    return axios.post('/api/v1/games', data)
      .then((response) => {
        dispatch(gameCreated(response.data))
      });
  } 
}

export function fetchGames() {
  return dispatch => {
    axios.get('/api/v1/games')
      .then(response => {
        dispatch(gamesReceived(response.data));
      })
  }
}