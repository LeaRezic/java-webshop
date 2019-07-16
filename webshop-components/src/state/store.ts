import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import Sagas from './sagas';
import { IAdminState } from '../containers/Admin/interfaces';
import { IAuthState } from '../containers/Auth/interfaces';
import { IShoppingState } from '../containers/Shop/interfaces';
import { IProductViewState } from '../containers/ProductView/interfaces';
import { IProfileState } from '../containers/Profile/interfaces';
import { ICheckoutState } from '../containers/Checkout/interfaces';

export interface IStore {
  admin: IAdminState;
  auth: IAuthState;
  checkout: ICheckoutState;
  profile: IProfileState;
  shop: IShoppingState;
  productView: IProductViewState;
}

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : null
  || compose;

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(Sagas);
  return store;
};

export const store = createAppStore();
