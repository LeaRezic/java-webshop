import { combineReducers } from 'redux';

import { IStore } from './store';
import { adminReducer } from '../containers/Admin/state/reducer';
import { authReducer } from '../containers/Auth/state/reducer';
import { productViewReducer } from '../containers/ProductView/state/reducer';
import { profileReducer } from '../containers/Profile/state/reducer';
import { shoppingReducer } from '../containers/Shop/state/reducer';

export const rootReducer = combineReducers<IStore, any>({
  admin: adminReducer,
  auth: authReducer,
  shop: shoppingReducer,
  productView: productViewReducer,
  profile: profileReducer,
});
