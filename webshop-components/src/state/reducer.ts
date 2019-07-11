import { combineReducers } from 'redux';

import { profileReducer } from '../containers/Profile/state/reducer';
import { authReducer } from '../containers/Auth/state/reducer';
import { shoppingReducer } from '../containers/Shop/state/reducer';
import { IStore } from './store';
import { productViewReducer } from '../containers/ProductView/state/reducer';

export const rootReducer = combineReducers<IStore, any>({
  auth: authReducer,
  shop: shoppingReducer,
  productView: productViewReducer,
  profile: profileReducer,
});
