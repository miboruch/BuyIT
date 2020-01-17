export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
export const ADD_TO_PRODUCTS = 'ADD_TO_PRODUCTS';
export const REMOVE_FROM_PRODUCTS = 'REMOVE_FROM_PRODUCTS';
export const REMOVE_FAILURE = 'REMOVE_FAILURE';

const initialState = {
  products: [],
  loading: true,
  error: null,
  removeError: null,
  category: 'all'
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case REMOVE_FAILURE:
      return {
        ...state,
        removeError: action.payload.error
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        category: action.payload
      };
    case ADD_TO_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case REMOVE_FROM_PRODUCTS:
      return {
        ...state,
        products: [...state.products.filter(item => item._id !== action.payload.id)]
      };
    default:
      return state;
  }
};
