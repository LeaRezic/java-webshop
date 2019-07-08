import { combineReducers } from 'redux';
import { Reducer } from 'react';

import { shoppingReducer } from '../containers/Shop/state/reducer';
import { authReducer } from '../containers/Auth/state/reducer';
import { IStore } from './store';

export const rootReducer = combineReducers<IStore, any>({
  shop: shoppingReducer,
  auth: authReducer,
});
