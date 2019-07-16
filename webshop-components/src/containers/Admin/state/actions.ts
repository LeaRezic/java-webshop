import { IReduxAction } from '../../../typings/interfaces';

import { IAdminUserData, ILoginLog } from '../interfaces';
import { IReceiptDetailed } from '../../Profile/interfaces';

export enum AdminActionTypes {
  USERS_DATA_REQUEST = 'USERS_DATA_REQUEST',
  USERS_DATA_SUCCESS = 'USERS_DATA_SUCCESS',
  USERS_DATA_FAILURE = 'USERS_DATA_FAILURE',
  LOGIN_LOGS_REQUEST = 'LOGIN_LOGS_REQUEST',
  LOGIN_LOGS_SUCCESS = 'LOGIN_LOGS_SUCCESS',
  LOGIN_LOGS_FAILURE = 'LOGIN_LOGS_FAILURE',
  RECEIPTS_REQUEST = 'RECEIPTS_REQUEST',
  RECEIPTS_SUCCESS = 'RECEIPTS_SUCCESS',
  RECEIPTS_FAILURE = 'RECEIPTS_FAILURE',
}

export const usersDataRequest = (authTokenId: string)
  : IReduxAction<string, void, void, AdminActionTypes.USERS_DATA_REQUEST> => {
  return {
    type: AdminActionTypes.USERS_DATA_REQUEST,
    data: authTokenId,
  };
}

export const usersDataSuccess = (usersData: IAdminUserData[])
  : IReduxAction<IAdminUserData[], void, void, AdminActionTypes.USERS_DATA_SUCCESS> => {
  return {
    type: AdminActionTypes.USERS_DATA_SUCCESS,
    data: usersData,
  };
}

export const usersDataFailure = (error: string)
  : IReduxAction<string, void, void, AdminActionTypes.USERS_DATA_FAILURE> => {
  return {
    type: AdminActionTypes.USERS_DATA_FAILURE,
    data: error,
  };
}

export const loginLogsRequest = (authTokenId: string)
  : IReduxAction<string, void, void, AdminActionTypes.LOGIN_LOGS_REQUEST> => {
  return {
    type: AdminActionTypes.LOGIN_LOGS_REQUEST,
    data: authTokenId,
  };
}

export const loginLogsSuccess = (loginLogs: ILoginLog[])
  : IReduxAction<ILoginLog[], void, void, AdminActionTypes.LOGIN_LOGS_SUCCESS> => {
  return {
    type: AdminActionTypes.LOGIN_LOGS_SUCCESS,
    data: loginLogs,
  };
}

export const loginLogsFailure = (error: string)
  : IReduxAction<string, void, void, AdminActionTypes.LOGIN_LOGS_FAILURE> => {
  return {
    type: AdminActionTypes.LOGIN_LOGS_FAILURE,
    data: error,
  };
}

export const receiptsRequest = (authTokenId: string)
  : IReduxAction<string, void, void, AdminActionTypes.RECEIPTS_REQUEST> => {
  return {
    type: AdminActionTypes.RECEIPTS_REQUEST,
    data: authTokenId,
  };
}

export const receiptsSuccess = (receipts: IReceiptDetailed[])
  : IReduxAction<IReceiptDetailed[], void, void, AdminActionTypes.RECEIPTS_SUCCESS> => {
  return {
    type: AdminActionTypes.RECEIPTS_SUCCESS,
    data: receipts,
  };
}

export const receiptsFailure = (error: string)
  : IReduxAction<string, void, void, AdminActionTypes.RECEIPTS_FAILURE> => {
  return {
    type: AdminActionTypes.RECEIPTS_FAILURE,
    data: error,
  };
}

export type AdminActions =
  | ReturnType<typeof usersDataRequest>
  | ReturnType<typeof usersDataSuccess>
  | ReturnType<typeof usersDataFailure>
  | ReturnType<typeof loginLogsRequest>
  | ReturnType<typeof loginLogsSuccess>
  | ReturnType<typeof loginLogsFailure>
  | ReturnType<typeof receiptsRequest>
  | ReturnType<typeof receiptsSuccess>
  | ReturnType<typeof receiptsFailure>
  ;
