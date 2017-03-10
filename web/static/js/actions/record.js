import axios from 'axios';

const recordCreated = data => {
  return {
    type: 'RECORD_CREATED',
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
    type: 'HOURS_RECEIVED',
    payload: data
  };
};

const fetchHours = (params) => {
  return dispatch => {
    return axios.get(`/api/v1/records/hours/${params.game_id}`, {params: params})
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