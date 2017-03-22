import axios from 'axios';
import Constants from '../constants';

const personCreated = data => {
  return {
    type: Constants.PERSON_CREATED,
    payload: data
  };
}

const personRemoved = data => {
  return {
    type: Constants.PERSON_REMOVED,
    payload: data
  }
}

const peopleReceived = data => {
  return {
    type: Constants.PEOPLE_DATA_RECEIVED,
    payload: data
  };
};

export function createPerson(params) {
  return dispatch => {
    return axios.post("/api/v1/people", params)
      .then(response => {
        dispatch(personCreated(response.data));
      });
  };
}

export function deletePerson(id) {
  return dispatch => {
    return axios.delete(`/api/v1/people/${id}`)
      .then(response => {
        dispatch(personRemoved(response.data));
      })
  }
}

export function fetchPeople() {
  return dispatch => {
    axios.get('/api/v1/people')
      .then(response => {
        dispatch(peopleReceived(response.data));
      });
  };
}