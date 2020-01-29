import axios from 'axios';
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from '../reducers/singleProductReducer';
import { API_URL } from '../utils/constants';

const fetchStart = () => {
  return {
    type: FETCH_START
  };
};

const fetchSuccess = product => {
  return {
    type: FETCH_SUCCESS,
    payload: product
  };
};

const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    payload: {
      error: error
    }
  };
};


