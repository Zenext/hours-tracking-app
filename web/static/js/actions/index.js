import { fetchGames } from './games';
import { fetchPeople } from './people';

export function initApp() {
  return dispatch => {
    dispatch(fetchGames());   
    dispatch(fetchPeople());
  }
}