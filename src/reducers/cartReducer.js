export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const RESET_CART = 'RESET_CART';

const initialState = {
  cart: [],
  totalPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, product],
        totalPrice: state.totalPrice + product.price
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: [...state.cart.filter(item => item.id !== action.payload.id)],
        totalPrice: state.totalPrice - action.payload.price
      };
    case RESET_CART:
      return {
        ...state,
        cart: []
      };
  }
};
