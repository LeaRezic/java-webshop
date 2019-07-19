import {
  takeLatest,
  put,
} from 'redux-saga/effects';
import { instance } from '../../../utils/axios';

import {
  ProfileActionTypes,
  purchaseHistoryRequest,
  purchaseHistorySuccess,
  purchaseHistoryFailure,
} from './actions';

export function* watchPurchaseHistoryRequest() {
  yield takeLatest(ProfileActionTypes.PURCHASE_HISTORY_REQUEST, purchaseHistoryRequestIntercept);
}

function* purchaseHistoryRequestIntercept(action: Readonly<ReturnType<typeof purchaseHistoryRequest>>) {
  try {
    const tokenId = action.data!;
    const ulr = '/auth/receipt';
    const response = yield instance.get(
      ulr,
      {
        method: 'get',
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`,
        }
      }
    );
    yield put(purchaseHistorySuccess(response.data.receipts));
  } catch (error) {
    if (typeof error.response === 'undefined') {
      yield put(purchaseHistoryFailure(error.message));
      return;
    }
    yield put(purchaseHistoryFailure(error.response.data.error));
  }
}
