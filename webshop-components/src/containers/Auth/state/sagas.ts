import {
  takeLatest,
  put,
} from 'redux-saga/effects';
import { notify } from 'react-notify-toast';

import { instance } from '../../../utils/axios';
import {
  saveAuthToken,
  readAuthToken,
  deleteAuthToken
} from '../../../utils/storageUtil';
import { getCurrentIP } from '../../../utils/ipUtil';
import {
  AuthActionTypes,
  authSuccess,
  authFailure,
  authRequest,
} from './actions';
import { IAuthDispatchData } from '../interfaces';
import { getDateFromToken } from '../../../utils/dateUtils';
import { clearCart } from '../../Shop/state/actions';
import { clearAdminData } from '../../Admin/state/actions';
import {
  clearProfile,
  setUsername,
} from '../../Profile/state/actions';

export function* watchAuthRequest() {
  yield takeLatest(AuthActionTypes.AUTH_REQUEST, authRequestIntercept);
}

function* authRequestIntercept(action: Readonly<ReturnType<typeof authRequest>>) {
  // const ip = yield getCurrentIP();
  const ip = 'unknown';
  const data: IAuthDispatchData = {
    credentials: {
      username: action.data.username,
      password: action.data.password,
    },
    visitorAddress: ip,
  };
  const url = action.data.isRegister ? '/login/register' : '/login/verify';
  try {
    const response = yield instance.post(
      url,
      JSON.stringify(data),
      {
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        }
      }
    );
    console.log(JSON.stringify(response));
    if (response != null && response.data != null && response.data.error != null) {
      throw new Error(response.data.error);
    }
    const message = action.data.isRegister
      ? `Created user ${response.data.token.email}.`
      : `Logged in as ${response.data.token.email}.`
    saveAuthToken(response.data.token);
    yield put(authSuccess(response.data.token));
    yield put(setUsername(response.data.token.email));
    notify.show(message, 'success', 2000);
  } catch (error) {
    if (typeof error.response === 'undefined') {
      yield put(authFailure(error.message));
      return;
    }
    yield put(authFailure(error.response.data.error));
  }
}

export function* watchAutoLogin() {
  yield takeLatest(AuthActionTypes.AUTO_SIGN_IN, autoLoginIntercept);
}

function* autoLoginIntercept() {
  instance.post('/noremote', JSON.stringify({ test: 'Testing noremote function response.' }),
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.data)
      .then((data) => console.log(`Noremote response: ${JSON.stringify(data)}`))
      .catch((err) => `Noremote err: ${err}`);
  const token = readAuthToken();
  if (!token
      || !token.email
      || !token.expireTime
      || !token.tokenId) {
    return;
  }
  console.log(token.expireTime);
  const expirationDate = getDateFromToken(token.expireTime);
  console.log(expirationDate);
  if (expirationDate < new Date()) {
    return;
  }
  yield put(authSuccess(token));
  yield put(setUsername(token.email));
}

export function* watchLogout() {
  yield takeLatest(AuthActionTypes.LOG_OUT, logoutIntercept);
}

function* logoutIntercept() {
  yield put(clearCart());
  yield put(clearProfile());
  yield put(clearAdminData());
  deleteAuthToken();
}
