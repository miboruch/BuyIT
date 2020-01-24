import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from '../reducers/cartReducer';

export const addProductToCart = product => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

export const removeProductFromCart = product => {
  return {
    type: REMOVE_PRODUCT,
    payload: product
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART
  };
};
