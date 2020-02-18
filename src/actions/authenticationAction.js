import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  GET_USER_INFO,
  GET_USER_INFO_ERROR,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from '../reducers/authenticationReducer';
import { API_URL } from '../utils/constants';
import { resetCart } from './cartAction';
import { fetchUserOrders } from './orderAction';
import { fetchAllUserProducts } from './productAction';

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

const updateSuccess = () => {
  return {
    type: UPDATE_SUCCESS
  };
};

const updateFailure = error => {
  return {
    type: UPDATE_FAILURE,
    payload: error
  };
};

export const getUserInfo = token => async dispatch => {
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

const logout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const authLogout = () => dispatch => {
  dispatch(authStart());
  localStorage.removeItem('token');
  localStorage.removeItem('userID');

  resetCart();
  dispatch(logout());
};

export const userLogin = (email, password, history) => async dispatch => {
  dispatch(authStart());

  try {
    const result = await axios.post(`${API_URL}/user/login`, { email, password });
    dispatch(authSuccess(result.data.token, result.data.id));
    dispatch(getUserInfo(result.data.token));
    dispatch(fetchUserOrders(result.data.token));
    dispatch(fetchAllUserProducts(result.data.token));
    history.push('/');
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('userID', result.data.id);
  } catch (error) {
    dispatch(authLoginFailure(error));
  }
};

export const userRegister = (
  email,
  password,
  name,
  lastName,
  city,
  address,
  country,
  history
) => async dispatch => {
  dispatch(authStart());

  try {
    const result = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
      name,
      lastName,
      city,
      address,
      country
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
    dispatch(fetchUserOrders(token));
    dispatch(fetchAllUserProducts(token));
  }
};

export const userUpdate = (name, lastName, city, address, country, token) => async dispatch => {
  dispatch(authStart());
  try {
    await axios.put(
      `${API_URL}/user/update`,
      { name, lastName, city, address, country },
      {
        headers: { 'auth-token': token }
      }
    );

    dispatch(updateSuccess());
    dispatch(getUserInfo(token));
  } catch (error) {
    dispatch(updateFailure(error));
  }
};
