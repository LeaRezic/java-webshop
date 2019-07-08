import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

// import { shoppingReducer } from '../containers/Shop/state/reducer';

import { rootReducer } from './reducer';
import Sagas from './sagas';
import { IShoppingState } from '../containers/Shop/interfaces';
import { IAuthState } from '../containers/Auth/interfaces';

export interface IStore {
  shop: IShoppingState;
  auth: IAuthState;
}

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
  || compose;

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
    // applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(Sagas);
  return store;
};

export const store = createAppStore();
