import {
  takeLatest,
  put,
} from 'redux-saga/effects';
import { instance } from '../../../utils/axios';

import {
  fetchProduct,
  fetchProductFailure,
  fetchProductSuccess,
  ProductViewActionTypes,
} from './actions';

export function* watchFetchProduct() {
  yield takeLatest(ProductViewActionTypes.FETCH_PRODUCT, fetchProductData);
}

function* fetchProductData(action: Readonly<ReturnType<typeof fetchProduct>>) {
  try {
    const id = action.data;
    const url = `/product/${id}`;
    const response = yield instance.get(url, { responseType: 'json' });
    yield put(fetchProductSuccess(response.data.product));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}
