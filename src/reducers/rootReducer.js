import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { authenticationReducer } from './authenticationReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
  productReducer,
  authenticationReducer,
  cartReducer,
});
