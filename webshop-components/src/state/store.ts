import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import Sagas from './sagas';
import { IAuthState } from '../containers/Auth/interfaces';
import { IShoppingState } from '../containers/Shop/interfaces';

export interface IStore {
  auth: IAuthState;
  shop: IShoppingState;
}

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
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
