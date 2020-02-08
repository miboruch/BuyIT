import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { authenticationReducer } from './authenticationReducer';
import { cartReducer } from './cartReducer';
import { sliderBoxesReducer } from './sliderBoxesReducer';

export const rootReducer = combineReducers({
  productReducer,
  authenticationReducer,
  cartReducer,
  sliderBoxesReducer
});
