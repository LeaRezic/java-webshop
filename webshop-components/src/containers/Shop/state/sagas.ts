import {
  takeLatest,
  put,
} from 'redux-saga/effects';

import { instance } from '../../../utils/axios';
import {
  fetchShopDataFailure,
  fetchShopDataSuccess,
  ShoppingActionTypes,
  fetchShopData,
} from './actions';

export function * watchFetchShopData() {
  yield takeLatest(ShoppingActionTypes.FETCH_SHOP_DATA_REQUEST, fetchShopDataIntercept);
}

function * fetchShopDataIntercept(action: Readonly<ReturnType<typeof fetchShopData>>) {
  try {
    const ulr = '/shopdata';
    const response = yield instance.get(ulr, { responseType: 'json' });
    yield put(fetchShopDataSuccess(response.data.shop));
  } catch (error) {
    yield put(fetchShopDataFailure(error.message));
  }
}
