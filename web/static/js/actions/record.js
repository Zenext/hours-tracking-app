import axios from 'axios';

import Constants from '../constants';

const recordCreated = data => {
  return {
    type: Constants.RECORD_CREATED,
    payload: data
  };
}

export function createRecord(params) {
  return dispatch => {
    return axios.post('/api/v1/records', params)
      .then(response => {
        dispatch(recordCreated(response.data.record));
        return response;
      })
  }
};

const hoursReceived = data => {
  return {
    type: Constants.HOURS_RECEIVED,
    payload: data
  };
};

const fetchHours = (params) => {
  return dispatch => {
    return axios.get(`/api/v1/records/hours`, {params: params})
      .then(response => {
        dispatch(hoursReceived(response.data))
      })
  }
}

export function getTotalHours(gameId) {
  const params = {game_id: gameId};

  return fetchHours(params);
}

export function getHoursByDate(gameId, startDate, endDate) {
  const params = {
    game_id: gameId,
    start_date: startDate,
    end_date: endDate
  };

  return fetchHours(params);
}