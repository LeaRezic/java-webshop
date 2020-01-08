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
    const url = '/auth/receipt';
    const response = yield instance.get(
      url,
      {
        method: 'get',
        headers: {
          'Authorization': `Bearer:${tokenId}`,
        },
        responseType: 'json',
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
