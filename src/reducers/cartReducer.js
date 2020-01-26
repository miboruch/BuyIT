export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const RESET_CART = 'RESET_CART';
export const LOAD_CART_ITEMS = 'LOAD_CART_ITEMS';

const initialState = {
  cart: [],
  totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        totalPrice: state.totalPrice + action.payload.price
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: [...state.cart.filter(item => item._id !== action.payload._id)],
        totalPrice: state.totalPrice - action.payload.price
      };
    case RESET_CART:
      return {
        ...state,
        cart: []
      };
    case LOAD_CART_ITEMS:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
