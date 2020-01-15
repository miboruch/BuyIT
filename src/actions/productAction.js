import axios from 'axios';
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from '../reducers/productReducer';

export const fetchStart = () => {
  return {
    type: FETCH_START
  };
};

export const fetchSuccess = products => {
  return {
    type: FETCH_SUCCESS,
    payload: products
  };
};

export const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    payload: {
      error: error
    }
  };
};

/* Fix this on backend to return only first 10, then add pagination */
export const fetchAllProducts = () => {}
