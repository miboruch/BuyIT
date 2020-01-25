import axios from 'axios';
import { socket } from '../utils/constants';
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CATEGORY_UPDATE,
  ADD_TO_PRODUCTS,
  REMOVE_FROM_PRODUCTS,
  REMOVE_FAILURE,
  RESERVE_PRODUCT,
  UNRESERVE_PRODUCT,
  UNRESERVE_ALL
} from '../reducers/productReducer';
import { API_URL } from '../utils/constants';
import { categories } from '../utils/constants';

const fetchStart = () => {
  return {
    type: FETCH_START
  };
};

const fetchSuccess = products => {
  return {
    type: FETCH_SUCCESS,
    payload: products
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

export const addToProducts = product => {
  return {
    type: ADD_TO_PRODUCTS,
    payload: product
  };
};

export const removeFromProducts = productId => {
  return {
    type: REMOVE_FROM_PRODUCTS,
    payload: {
      id: productId
    }
  };
};

export const reserveProduct = productId => {
  return {
    type: RESERVE_PRODUCT,
    payload: productId
  };
};

export const unreserveProduct = productId => {
  return {
    type: UNRESERVE_PRODUCT,
    payload: productId
  };
};

export const unreserveAll = () => {
  return {
    type: UNRESERVE_ALL
  };
};

const removeFailure = error => {
  return {
    type: REMOVE_FAILURE,
    payload: {
      error: error
    }
  };
};

export const updateCategory = category => {
  return {
    type: CATEGORY_UPDATE,
    payload: category
  };
};

/* Fix this on backend to return only first 10, then add pagination */
export const fetchAllProducts = category => async dispatch => {
  dispatch(fetchStart());
  try {
    const [currentCategory] = categories.filter(item => category.includes(item));
    console.log(currentCategory);

    if (!currentCategory) {
      return new Error('Wrong category provided');
    }
    const result = await axios.get(
      currentCategory === 'all'
        ? `${API_URL}/product/getAll`
        : `${API_URL}/product/getAllCategoryProducts/${category}`
    );

    dispatch(fetchSuccess(result.data));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const searchProductByQuery = query => async dispatch => {
  console.log(query);
  dispatch(fetchStart());
  try {
    const queryResult = query.split(' ').join('_');

    const result = await axios.get(`${API_URL}/product/search/${queryResult}`);
    dispatch(fetchSuccess(result.data));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const removeProduct = (token, productID) => async dispatch => {
  try {
    const result = await axios.post(
      `${API_URL}/product/removeProduct`,
      { id: productID },
      {
        headers: { 'auth-token': token }
      }
    );
  } catch (error) {
    dispatch(removeFailure(error));
  }
};
