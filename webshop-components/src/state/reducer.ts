import { combineReducers } from 'redux';

import { authReducer } from '../containers/Auth/state/reducer';
import { shoppingReducer } from '../containers/Shop/state/reducer';
import { IStore } from './store';

export const rootReducer = combineReducers<IStore, any>({
  auth: authReducer,
  shop: shoppingReducer,
});
