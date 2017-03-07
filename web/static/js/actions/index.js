import { fetchGames } from './game';

export function initApp() {
  return dispatch => {
    dispatch(fetchGames());   
  }
}