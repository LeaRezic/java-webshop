import { takeLatest, put } from 'redux-saga/effects';
import { instance } from '../../../utils/axios';

import {
  AdminActionTypes,
  usersDataFailure,
  usersDataSuccess,
  usersDataRequest,
  loginLogsRequest,
  loginLogsFailure,
  loginLogsSuccess,
  receiptsRequest,
  receiptsFailure,
  receiptsSuccess,
} from './actions';

export function* watchUsersDataRequest() {
  yield takeLatest(AdminActionTypes.USERS_DATA_REQUEST, usersDataRequestIntercept);
}

function* usersDataRequestIntercept(action: Readonly<ReturnType<typeof usersDataRequest>>) {
  try {
    const tokenId = action.data!;
    const ulr = '/users';
    const response = yield instance.get(
      ulr,
      {
        method: 'get',
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`,
        }
      }
    );
    if (response.data.error) {
      yield put(usersDataFailure(response.data.error));
      return;
    }
    yield put(usersDataSuccess(response.data.users));
  } catch (error) {
    yield put(usersDataFailure(error.message));
  }
}

export function* watchLoginLogsRequest() {
  yield takeLatest(AdminActionTypes.LOGIN_LOGS_REQUEST, loginLogsRequestIntercept);
}

function* loginLogsRequestIntercept(action: Readonly<ReturnType<typeof loginLogsRequest>>) {
  try {
    const tokenId = action.data!;
    const ulr = '/loginlogs';
    const response = yield instance.get(
      ulr,
      {
        method: 'get',
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`,
        }
      }
    );
    if (response.data.error) {
      yield put(loginLogsFailure(response.data.error));
      return;
    }
    yield put(loginLogsSuccess(response.data.logs));
  } catch (error) {
    yield put(loginLogsFailure(error.message));
  }
}

export function* watchReceiptsRequest() {
  yield takeLatest(AdminActionTypes.RECEIPTS_REQUEST, receiptsRequestIntercept);
}

function* receiptsRequestIntercept(action: Readonly<ReturnType<typeof receiptsRequest>>) {
  try {
    const tokenId = action.data!;
    const ulr = '/receipt';
    const response = yield instance.get(
      ulr,
      {
        method: 'get',
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Authorization': `Bearer:${tokenId}`,
        }
      }
    );
    if (response.data.error) {
      yield put(receiptsFailure(response.data.error));
      return;
    }
    yield put(receiptsSuccess(response.data.receipts));
  } catch (error) {
    yield put(receiptsFailure(error.message));
  }
}
