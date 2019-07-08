import { fork } from 'redux-saga/effects';

// import sagas from '../containers/Shop/state/sagas';
import { watchFetchProducts } from '../containers/Shop/state/sagas';

export default function * root() {
  yield watchFetchProducts();
  // yield sagas.map((saga) => fork(saga));
}
