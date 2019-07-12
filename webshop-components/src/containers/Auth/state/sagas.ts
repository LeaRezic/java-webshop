import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { AuthActionTypes, loginSuccess, loginFailure, loginRequest, registerRequest, logOut } from './actions';

export function* watchLoginRequest() {
  yield takeLatest(AuthActionTypes.LOG_IN_REQUEST, loginRequestIntercept);
}

function* loginRequestIntercept(action: Readonly<ReturnType<typeof loginRequest>>) {
  try {
    const { username, password } = action.data!;
    const response = yield axios.post(
      'http://localhost:8080/webshop_web_war_exploded/login',
      JSON.stringify({ username: username, password: password }),
      {
        method: 'post',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
    console.log(response.data.token);
    if (response.data.error) {
      yield put(loginFailure(response.data.error));
      return;
    }
    yield put(loginSuccess(response.data.token));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchRegisterRequest() {
  yield takeLatest(AuthActionTypes.REGISTER_REQUEST, registerRequestIntercept);
}

function* registerRequestIntercept(action: Readonly<ReturnType<typeof registerRequest>>) {
  try {
    const { username, password } = action.data!;
    const response = yield axios.post(
      'http://localhost:8080/webshop_web_war_exploded/register',
      JSON.stringify({ username: username, password: password }),
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    );
    console.log(response.data.token);
    if (response.data.error) {
      yield put(loginFailure(response.data.error));
      return;
    }
    yield put(loginSuccess(response.data.token));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
