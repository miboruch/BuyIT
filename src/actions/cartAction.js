import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from '../reducers/cartReducer';
import { socket } from '../utils/constants';

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

const removeProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    payload: product
  };
};

export const addProductToCart = product => dispatch => {
  socket.emit('productReservation', { productId: product._id });
  dispatch(addProduct(product));
};

export const removeProductFromCart = product => dispatch => {
  socket.emit('productDeleteReservation', { productId: product._id });
  dispatch(removeProduct(product));
};

export const resetCart = () => {
  return {
    type: RESET_CART
  };
};
