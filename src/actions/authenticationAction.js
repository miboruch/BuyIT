import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  GET_USER_INFO,
  GET_USER_INFO_ERROR
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

const authLoginFailure = error => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: {
      error: error
    }
  };
};

const authRegisterFailure = error => {
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: {
      error: error
    }
  };
};

const userInfoSuccess = userInfo => {
  return {
    type: GET_USER_INFO,
    payload: userInfo
  };
};

const userInfoError = error => {
  return {
    type: GET_USER_INFO_ERROR,
    payload: error
  };
};

const getUserInfo = token => async dispatch => {
  dispatch(authStart());
  try {
    const result = await axios.get(`${API_URL}/user/information`, {
      headers: { 'auth-token': token }
    });
    dispatch(userInfoSuccess(result.data));
  } catch (error) {
    dispatch(userInfoError(error));
  }
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const userLogin = (email, password, history) => async dispatch => {
  dispatch(authStart());

  try {
    const result = await axios.post(`${API_URL}/user/login`, { email, password });
    dispatch(authSuccess(result.data.token, result.data.id));
    dispatch(getUserInfo(result.data.token));
    history.push('/');
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('userID', result.data.id);
  } catch (error) {
    console.log(error.message);
    dispatch(authLoginFailure(error));
  }
};

export const userRegister = (
  login,
  email,
  password,
  name,
  lastName,
  city,
  address,
  history
) => async dispatch => {
  dispatch(authStart());

  try {
    const result = await axios.post(`${API_URL}/user/register`, {
      login,
      email,
      password,
      name,
      lastName,
      city,
      address
    });

    dispatch(authSuccess(result.data.token, result.data._doc._id));
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('userID', result.data._doc._id);
    history.push('/');
  } catch (error) {
    dispatch(authRegisterFailure(error));
  }
};

export const authenticationCheck = () => async dispatch => {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');

  if (token && userID) {
    dispatch(authSuccess(token, userID));
    dispatch(getUserInfo(token));
  } else {
    dispatch(authLogout());
  }
};
