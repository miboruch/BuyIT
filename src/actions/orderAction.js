import {
  ORDER_START,
  ORDER_SUCCESS,
  ORDER_ERROR,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR
} from '../reducers/orderReducer';

const makeOrderStart = () => {
  return {
    type: ORDER_START
  };
};

const makeOrderSuccess = () => {
  return {
    type: ORDER_SUCCESS
  };
};

const makeOrderError = error => {
  return {
    type: ORDER_ERROR,
    payload: error
  };
};

const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  };
};

const fetchOrdersSuccess = result => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: result
  };
};

const fetchOrdersError = error => {
  return {
    type: FETCH_ORDERS_ERROR
  };
};

export const createOrder = () => dispatch => {
  dispatch(makeOrderStart());
  try {
  } catch (error) {
    dispatch(makeOrderError(error));
  }
};
