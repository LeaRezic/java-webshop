import { combineReducers } from 'redux';
import { productsReducer } from '../containers/Shop/state/reducer';

export const rootReducer = combineReducers({
  products: productsReducer,
});
