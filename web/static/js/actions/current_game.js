import axios from 'axios';

const gameReceived = data => {
  return {
    type: 'GAME_DATA_RECEIVED',
    payload: data
  }
}

export function updateGame(id, params) {
  return dispatch => {
    return axios.put(`/api/v1/games/${id}`, params);
  }
}

export function fetchGame(id) {
  return dispatch => {
    return axios.get(`/api/v1/games/${id}`)
      .then(response => {
        dispatch(gameReceived(response.data));
      })
  }
}