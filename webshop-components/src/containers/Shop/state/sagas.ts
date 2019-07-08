import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchProducts, fetchProductsFailure, fetchProductsSuccess, ShoppingActionTypes } from './actions';

export function * watchFetchProducts() {
  yield takeLatest(ShoppingActionTypes.FETCH_PRODUCTS, fetchProductsData);
}

function * fetchProductsData(action: Readonly<ReturnType<typeof fetchProducts>>) {
  try {
    const response = yield axios.get('http://localhost:8080/webshop_web_war_exploded/product', { responseType: 'json' });
    yield put(fetchProductsSuccess(response.data.products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// export default [watchFetchProducts];
