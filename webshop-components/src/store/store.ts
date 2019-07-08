import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { productsReducer } from '../containers/Shop/state/reducer';
// import Sagas from './sagas';

const createAppStore = () => {
  // const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    productsReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(sagaMiddleware)
    );
  // sagaMiddleware.run(Sagas);
  return store;
};

export const store = createAppStore();
