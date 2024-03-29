import { IReduxAction } from '../../../typings/interfaces';

import { IAdminUserData, ILoginLog, AdminViewType } from '../interfaces';
import { IReceiptDetailed } from '../../Profile/interfaces';

export enum AdminActionTypes {
  SET_ADMIN_VIEW = 'SET_ADMIN_VIEW',
  USERS_DATA_REQUEST = 'USERS_DATA_REQUEST',
  USERS_DATA_SUCCESS = 'USERS_DATA_SUCCESS',
  USERS_DATA_FAILURE = 'USERS_DATA_FAILURE',
  LOGIN_LOGS_REQUEST = 'LOGIN_LOGS_REQUEST',
  LOGIN_LOGS_SUCCESS = 'LOGIN_LOGS_SUCCESS',
  LOGIN_LOGS_FAILURE = 'LOGIN_LOGS_FAILURE',
  LOGIN_LOGS_SET_USERNAME_FILTER = 'LOGIN_LOGS_SET_USERNAME_FILTER',
  LOGIN_LOGS_SET_DATES_FILTER = 'LOGIN_LOGS_SET_DATES_FILTER',
  RECEIPTS_REQUEST = 'RECEIPTS_REQUEST',
  RECEIPTS_SUCCESS = 'RECEIPTS_SUCCESS',
  RECEIPTS_FAILURE = 'RECEIPTS_FAILURE',
  RECEIPTS_SET_USERNAME_FILTER = 'RECEIPTS_SET_USERNAME_FILTER',
  RECEIPTS_SET_DATES_FILTER = 'RECEIPTS_SET_DATES_FILTER',
  CLEAR_ADMIN_DATA = 'CLEAR_ADMIN_DATA',
}

export const setAdminView = (view: AdminViewType)
  :IReduxAction<AdminViewType, void, void, AdminActionTypes.SET_ADMIN_VIEW> => {
    return {
      type: AdminActionTypes.SET_ADMIN_VIEW,
      data: view,
    };
};

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

export const loginLogsSetUsernameFilter = (username: string)
  :IReduxAction<string, void, void, AdminActionTypes.LOGIN_LOGS_SET_USERNAME_FILTER> => {
    return {
      type: AdminActionTypes.LOGIN_LOGS_SET_USERNAME_FILTER,
      data: username,
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

export const receiptsSetUsernameFilter = (username: string)
  : IReduxAction<string, void, void, AdminActionTypes.RECEIPTS_SET_USERNAME_FILTER> => {
  return {
    type: AdminActionTypes.RECEIPTS_SET_USERNAME_FILTER,
    data: username,
  };
}

export const loginLogsSetDatesFilter = (dateRange: Date[])
  : IReduxAction<Date[], void, void, AdminActionTypes.LOGIN_LOGS_SET_DATES_FILTER> => {
  return {
    type: AdminActionTypes.LOGIN_LOGS_SET_DATES_FILTER,
    data: dateRange,
  };
}

export const receiptsSetDatesFilter = (dateRange: Date[])
  : IReduxAction<Date[], void, void, AdminActionTypes.RECEIPTS_SET_DATES_FILTER> => {
  return {
    type: AdminActionTypes.RECEIPTS_SET_DATES_FILTER,
    data: dateRange,
  };
}

export const clearAdminData = ()
  : IReduxAction<void, void, void, AdminActionTypes.CLEAR_ADMIN_DATA> => {
  return {
    type: AdminActionTypes.CLEAR_ADMIN_DATA,
  };
}

export type AdminActions =
  | ReturnType<typeof setAdminView>
  | ReturnType<typeof usersDataRequest>
  | ReturnType<typeof usersDataSuccess>
  | ReturnType<typeof usersDataFailure>
  | ReturnType<typeof loginLogsRequest>
  | ReturnType<typeof loginLogsSuccess>
  | ReturnType<typeof loginLogsFailure>
  | ReturnType<typeof loginLogsSetUsernameFilter>
  | ReturnType<typeof receiptsRequest>
  | ReturnType<typeof receiptsSuccess>
  | ReturnType<typeof receiptsFailure>
  | ReturnType<typeof receiptsSetUsernameFilter>
  | ReturnType<typeof loginLogsSetDatesFilter>
  | ReturnType<typeof receiptsSetDatesFilter>
  | ReturnType<typeof clearAdminData>
  ;
