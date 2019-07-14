import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

import { AuthActionTypes, loginSuccess, loginFailure, loginRequest, registerRequest, logOut } from './actions';

export function* watchLoginRequest() {
  yield takeLatest(AuthActionTypes.LOG_IN_REQUEST, loginRequestIntercept);
}

function* loginRequestIntercept(action: Readonly<ReturnType<typeof loginRequest>>) {
  try {
    const { username, password } = action.data!;
    const ulr = encodeURI(`http://learezic.from.hr:8080/webshop-web_war exploded/login`);
    const response = yield axios.post(
      ulr,
      JSON.stringify({ username: username, password: password }),
      {
        method: 'post',
        headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
        }
      }
    );
    yield put(loginSuccess(response.data.token));
  } catch (error) {
    if (typeof error.response === 'undefined') {
      yield put(loginFailure(error.message));
      return;
    }
    yield put(loginFailure(error.response.data.error));
  }
}

export function* watchRegisterRequest() {
  yield takeLatest(AuthActionTypes.REGISTER_REQUEST, registerRequestIntercept);
}

function* registerRequestIntercept(action: Readonly<ReturnType<typeof registerRequest>>) {
  try {
    const { username, password } = action.data!;
    const ulr = encodeURI(`http://learezic.from.hr:8080/webshop-web_war exploded/register`);
    const response = yield axios.post(
      ulr,
      JSON.stringify({ username: username, password: password }),
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
    notify.show(`Created user ${action.data.username}.`, 'success', 2000);
    yield put(loginSuccess(response.data.token));
  } catch (error) {
    if (typeof error.response === 'undefined') {
      yield put(loginFailure(error.message));
      return;
    }
    yield put(loginFailure(error.response.data.error));
  }
}
