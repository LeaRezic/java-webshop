import { all } from 'redux-saga/effects';

import {
  watchFetchShopData,
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
} from '../containers/Profile/state/sagas';
import {
  watchUsersDataRequest,
  watchLoginLogsRequest,
  watchReceiptsRequest,
} from '../containers/Admin/state/sagas';

export default function * root() {
  yield all([
    watchFetchShopData(),
    watchFetchProduct(),
    watchAuthRequest(),
    watchAutoLogin(),
    watchPurchaseHistoryRequest(),
    watchUsersDataRequest(),
    watchLoginLogsRequest(),
    watchReceiptsRequest(),
    watchCreateReceiptRequest(),
    watchLogout(),
  ])
}
