import { takeLatest, put } from 'redux-saga/effects';
import { notify } from 'react-notify-toast';

import { instance } from '../../../utils/axios';
import { AuthActionTypes, loginSuccess, loginFailure, loginRequest, registerRequest, logOut } from './actions';

export function* watchLoginRequest() {
  yield takeLatest(AuthActionTypes.LOG_IN_REQUEST, loginRequestIntercept);
}

function* loginRequestIntercept(action: Readonly<ReturnType<typeof loginRequest>>) {
  try {
    const { username, password } = action.data!;
    const ulr = '/login';
    const response = yield instance.post(
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
    const ulr = encodeURI(`/register`);
    const response = yield instance.post(
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
