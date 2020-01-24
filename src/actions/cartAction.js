import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_CART } from '../reducers/cartReducer';

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

export const addProductToCart = (socket, product) => dispatch => {
  socket.emit('productReservation', { productId: product._id });
  dispatch(addProduct(product));
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
