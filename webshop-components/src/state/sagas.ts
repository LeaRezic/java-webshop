import { fork, all } from 'redux-saga/effects';

// import sagas from '../containers/Shop/state/sagas';
import { watchFetchProducts, watchFetchCategories } from '../containers/Shop/state/sagas';
import { watchFetchProduct } from '../containers/ProductView/state/sagas';
import { watchLoginRequest, watchRegisterRequest } from '../containers/Auth/state/sagas';
import { watchPurchaseHistoryRequest, watchProfileDetailsRequest } from '../containers/Profile/state/sagas';
import { watchUsersDataRequest, watchLoginLogsRequest, watchReceiptsRequest } from '../containers/Admin/state/sagas';

export default function * root() {
  // yield watchFetchProducts();
  // yield sagas.map((saga) => fork(saga));
  yield all([
    watchFetchProducts(),
    watchFetchCategories(),
    watchFetchProduct(),
    watchLoginRequest(),
    watchRegisterRequest(),
    watchPurchaseHistoryRequest(),
    watchProfileDetailsRequest(),
    watchUsersDataRequest(),
    watchLoginLogsRequest(),
    watchReceiptsRequest(),
  ])
}
