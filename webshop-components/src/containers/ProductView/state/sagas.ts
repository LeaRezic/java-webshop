import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

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
    const ulr = encodeURI(`http://learezic.from.hr:8080/webshop-web_war exploded/product/${id}`);
    const response = yield axios.get(ulr, { responseType: 'json' });
    yield put(fetchProductSuccess(response.data.product));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}
