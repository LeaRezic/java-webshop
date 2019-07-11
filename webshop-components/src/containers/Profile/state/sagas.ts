import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { ProfileActionTypes, purchaseHistoryRequest, purchaseHistorySuccess, purchaseHistoryFailure, profileDetailsRequest, profileDetailsFailure, profileDetailsSuccess } from './actions';

export function* watchPurchaseHistoryRequest() {
  yield takeLatest(ProfileActionTypes.PURCHASE_HISTORY_REQUEST, purchaseHistoryRequestIntercept);
}

function* purchaseHistoryRequestIntercept(action: Readonly<ReturnType<typeof purchaseHistoryRequest>>) {
  try {
    const tokenId = action.data!;
    const response = yield axios.get(
      'http://localhost:8080/webshop_web_war_exploded/receipt',
      {
        method: 'get',
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`,
        }
      }
    );
    console.log(response.data.receipts);
    if (response.data.error) {
      yield put(purchaseHistoryFailure(response.data.error));
      return;
    }
    yield put(purchaseHistorySuccess(response.data.receipts));
  } catch (error) {
    yield put(purchaseHistoryFailure(error.message));
  }
}

export function* watchProfileDetailsRequest() {
  yield takeLatest(ProfileActionTypes.PROFILE_DETAILS_REQUEST, profileDetilsRequestIntercept);
}

function* profileDetilsRequestIntercept(action: Readonly<ReturnType<typeof profileDetailsRequest>>) {
  try {
    const tokenId = action.data!;
    const response = yield axios.get(
      'http://localhost:8080/webshop_web_war_exploded/profile',
      {
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`
        }
      }
    );
    console.log(response.data.receipts);
    if (response.data.error) {
      yield put(profileDetailsFailure(response.data.error));
      return;
    }
    yield put(profileDetailsSuccess(response.data.profile));
  } catch (error) {
    yield put(profileDetailsFailure(error.message));
  }
}
