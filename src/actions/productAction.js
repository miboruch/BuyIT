import axios from 'axios';
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  CATEGORY_UPDATE
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

    dispatch(fetchSuccess(result.data.products));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};
