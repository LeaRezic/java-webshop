import { takeLatest, put } from 'redux-saga/effects';
import { notify } from 'react-notify-toast';

import { instance } from '../../../utils/axios';
import { wtf } from '../../../utils/ipUtil';
import { AuthActionTypes, loginSuccess, loginFailure, loginRequest, registerRequest, logOut } from './actions';
import { IAuthRequestData } from '../interfaces';

export function* watchLoginRequest() {
  yield takeLatest(AuthActionTypes.LOG_IN_REQUEST, loginRequestIntercept);
}

function* loginRequestIntercept(action: Readonly<ReturnType<typeof loginRequest>>) {
  try {
    const ip = yield wtf();
    const data: IAuthRequestData = {
      credentials: {
        username: action.data.username,
        password: action.data.password,
      },
      visitorAddress: ip,
    };
    const ulr = '/login';
    const response = yield instance.post(
      ulr,
      JSON.stringify(data),
      {
        method: 'post',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
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
    const ip = yield wtf();
    const data: IAuthRequestData = {
      credentials: {
        username: action.data.username,
        password: action.data.password,
      },
      visitorAddress: ip,
    };
    const ulr = '/register';
    const response = yield instance.post(
      ulr,
      JSON.stringify(data),
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
