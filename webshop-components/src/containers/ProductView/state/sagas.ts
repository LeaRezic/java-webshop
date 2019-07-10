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
    const response = yield axios.get(`http://localhost:8080/webshop_web_war_exploded/product/${id}`, { responseType: 'json' });
    yield put(fetchProductSuccess(response.data.product));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}
