import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { AuthActionTypes, loginSuccess, loginFailure, loginRequest } from './actions';

export function* watchLoginRequest() {
  yield takeLatest(AuthActionTypes.LOG_IN_REQUEST, loginRequestIntercept);
}

function* loginRequestIntercept(action: Readonly<ReturnType<typeof loginRequest>>) {
  try {
    const { username, password } = action.data!;
    const response = yield axios.post(
      'http://localhost:8080/webshop_web_war_exploded/login',
      { username: username, password: password },
      { method: 'post', headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      } }
    );
    console.log(response.data.user);
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
