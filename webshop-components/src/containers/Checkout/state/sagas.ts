import {
  takeLatest,
  put,
} from 'redux-saga/effects';
import { notify } from 'react-notify-toast';

import { instance } from '../../../utils/axios';
import {
  CheckoutActionTypes,
  createReceiptRequest,
  createReceiptSuccess,
  createReceiptFailure,
} from './actions';
import { clearCart } from '../../Shop/state/actions';
import { PaymentMethod } from '../interfaces';

export function* watchCreateReceiptRequest() {
  yield takeLatest(CheckoutActionTypes.CREATE_RECEIPT_REQUEST, createReceiptRequestIntercept);
}

function* createReceiptRequestIntercept(action: Readonly<ReturnType<typeof createReceiptRequest>>) {
  const { paymentMethod } = action.data;
  let data;
  const url = '/auth/receipt';
  if (paymentMethod === PaymentMethod.CASH) {
    data = {
      method: 'CASH',
      username: '',
      password: action.data.password,
      receiptItems: action.data.items,
    };
  } else {
    data = {
      method: 'PAY_PAL',
      username: action.data.username,
      password: '',
      receiptItems: action.data.items,
    };
  }
  try {
    const response = yield instance.post(
      url,
      JSON.stringify(data),
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer:${action.data.tokenId}`,
        }
      }
    );
    notify.show(`Checkout successful.\nIssued receipt ${response.data.receiptNumber}.`, 'success', 2000);
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
