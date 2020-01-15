export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const CATEGORY_UPDATE = 'CATEGORY_UPDATE';

const initialState = {
  products: [],
  loading: true,
  error: null,
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
    case CATEGORY_UPDATE:
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
};
