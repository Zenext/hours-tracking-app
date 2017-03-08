import axios from 'axios';

const recordCreated = data => {
  return {
    type: 'RECORD_CREATED',
    payload: data
  };
}

const adaptRecordData = data => {
  return {
    game_id: data.selectedGame.id,
    hours: data.hours,
    work_type: data.selectedWorkType,
    date: data.date
  };
};

export function createRecord(data) {
  const newData = adaptRecordData(data);
  
  return dispatch => {
    return axios.post('/api/v1/records', newData)
      .then(response => {
        dispatch(recordCreated(response.data.record));
      });
  }
};

const recordsReceived = data => {
  return {
    type: 'RECORDS_RECEIVED',
    payload: data
  }
};

export function fetchRecords(id) {
  const params = {game_id: id};
  return dispatch => {
    return axios.get(`/api/v1/records/${id}`, {params}) 
      .then(response => {
        dispatch(recordsReceived(response.data));
      });
  };
};