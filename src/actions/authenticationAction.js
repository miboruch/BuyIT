import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT
} from '../reducers/authenticationReducer';
import { API_URL } from '../utils/constants';

const authStart = () => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token, userID) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token: token,
      userID: userID
    }
  };
};

const authFailure = error => {
  return {
    type: AUTH_FAILURE,
    payload: {
      error: error
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const userLogin = (email, password) => async dispatch => {
  dispatch(authStart());

  try {
    const result = await axios.post(`${API_URL}/user/login`, { email, password });

    dispatch(authSuccess(result.data.token, result.data.id));
  } catch (error) {
    dispatch(authFailure(error));
  }
};
