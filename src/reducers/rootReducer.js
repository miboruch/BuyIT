import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { authenticationReducer } from './authenticationReducer';
import { cartReducer } from './cartReducer';
import { sliderBoxesReducer } from './sliderBoxesReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  productReducer,
  authenticationReducer,
  cartReducer,
  sliderBoxesReducer,
  orderReducer
});
