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