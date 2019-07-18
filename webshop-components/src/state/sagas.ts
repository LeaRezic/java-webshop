import { all } from 'redux-saga/effects';

import {
  watchFetchProducts,
  watchFetchCategories,
} from '../containers/Shop/state/sagas';
import { watchFetchProduct } from '../containers/ProductView/state/sagas';
import { watchCreateReceiptRequest } from '../containers/Checkout/state/sagas';
import {
  watchAuthRequest,
  watchAutoLogin,
  watchLogout,
} from '../containers/Auth/state/sagas';
import {
  watchPurchaseHistoryRequest,
  watchProfileDetailsRequest,
} from '../containers/Profile/state/sagas';
import {
  watchUsersDataRequest,
  watchLoginLogsRequest,
  watchReceiptsRequest,
} from '../containers/Admin/state/sagas';

export default function * root() {
  yield all([
    watchFetchProducts(),
    watchFetchCategories(),
    watchFetchProduct(),
    watchAuthRequest(),
    watchAutoLogin(),
    watchPurchaseHistoryRequest(),
    watchProfileDetailsRequest(),
    watchUsersDataRequest(),
    watchLoginLogsRequest(),
    watchReceiptsRequest(),
    watchCreateReceiptRequest(),
    watchLogout(),
  ])
}
