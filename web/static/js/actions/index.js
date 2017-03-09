import { fetchGames } from './games';

export function initApp() {
  return dispatch => {
    dispatch(fetchGames());   
  }
}