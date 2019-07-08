import { combineReducers } from 'redux';

import { shoppingReducer } from '../containers/Shop/state/reducer';
import { authReducer } from '../containers/Auth/state/reducer';

export const rootReducer = combineReducers({
  shop: shoppingReducer,
  auth: authReducer,
});
