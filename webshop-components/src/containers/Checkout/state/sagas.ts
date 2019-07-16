import { takeLatest, put } from 'redux-saga/effects';
import { notify } from 'react-notify-toast';

import { instance } from '../../../utils/axios';
import { CheckoutActionTypes, createReceiptRequest, createReceiptSuccess, createReceiptFailure } from './actions';
import { clearCart } from '../../Shop/state/actions';

export function* watchCreateReceiptRequest() {
  yield takeLatest(CheckoutActionTypes.CREATE_RECEIPT_REQUEST, createReceiptRequestIntercept);
}

function* createReceiptRequestIntercept(action: Readonly<ReturnType<typeof createReceiptRequest>>) {
  try {
    const data = {
      password: action.data.password,
      receiptItems: action.data.items,
    };
    const ulr = '/receipt';
    const response = yield instance.post(
      ulr,
      JSON.stringify(data),
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer:${action.data.tokenId}`,
        }
      }
    );
    notify.show(`Checkout successful. Issued receipt ${response.data.receiptNumber}.`, 'success', 2000);
    yield put(clearCart());
    yield put(createReceiptSuccess(response.data.token));
  } catch (error) {
    if (typeof error.response === 'undefined') {
      yield put(createReceiptFailure(error.message));
      return;
    }
    yield put(createReceiptFailure(error.response.data.error));
  }
}
