import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { authenticationReducer } from './authenticationReducer';

export const rootReducer = combineReducers({
  productReducer,
  authenticationReducer
});
