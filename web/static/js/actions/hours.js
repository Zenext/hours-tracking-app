import axios from 'axios';
import Constants from '../constants';

const fetchHours = (params) => {
  return axios.get(`/api/v1/records/hours`, {params: params});
}

export function getHoursByDate(gameId, personId, startDate, endDate) {
  const params = {
    game_id: gameId,
    person_id: personId,
    start_date: startDate,
    end_date: endDate
  };

  return fetchHours(params);
}