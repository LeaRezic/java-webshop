import { IReduxAction } from '../../../types/interfaces';

export enum AuthActionTypes {
  LOG_IN_REQUEST = 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
  LOG_OUT = 'LOG_OUT',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  STOP_REDIRECT_TO_PRODUCTS = 'STOP_REDIRECT_TO_PRODUCTS',
}

export interface IUserRequestInfo {
  username: string;
  password: string;
}

export interface IUserResponseInfo {
  username: string;
  isAdmin: boolean;
}

export const loginRequest = (userInfo: IUserRequestInfo)
  :IReduxAction<IUserRequestInfo, void, void, AuthActionTypes.LOG_IN_REQUEST> => {
  return {
    type: AuthActionTypes.LOG_IN_REQUEST,
    data: userInfo,
  };
}

export const loginSuccess = (userInfo: IUserResponseInfo)
  :IReduxAction<IUserResponseInfo, void, void, AuthActionTypes.LOG_IN_SUCCESS> => {
  return {
    type: AuthActionTypes.LOG_IN_SUCCESS,
    data: userInfo,
  };
}

export const loginFailure = (error: string)
  :IReduxAction<string, void, void, AuthActionTypes.LOG_IN_FAILURE> => {
  return {
    type: AuthActionTypes.LOG_IN_FAILURE,
    data: error,
  };
}

export const logOut = ()
  : IReduxAction<void, void, void, AuthActionTypes.LOG_OUT> => {
  return {
    type: AuthActionTypes.LOG_OUT,
  };
}

export const registerRequest = (userInfo: IUserRequestInfo)
  :IReduxAction<IUserRequestInfo, void, void, AuthActionTypes.REGISTER_REQUEST> => {
  return {
    type: AuthActionTypes.REGISTER_REQUEST,
    data: userInfo,
  };
}

export const registerSuccess = (userInfo: IUserResponseInfo)
  :IReduxAction<IUserResponseInfo, void, void, AuthActionTypes.REGISTER_SUCCESS> => {
  return {
    type: AuthActionTypes.REGISTER_SUCCESS,
    data: userInfo,
  };
}

export const registerFailure = (error: string)
  :IReduxAction<string, void, void, AuthActionTypes.REGISTER_FAILURE> => {
  return {
    type: AuthActionTypes.REGISTER_FAILURE,
    data: error,
  };
}

export const stopRedirectToProducts = ()
  : IReduxAction<void, void, void, AuthActionTypes.STOP_REDIRECT_TO_PRODUCTS> => {
  return {
    type: AuthActionTypes.STOP_REDIRECT_TO_PRODUCTS,
  };
}

export type AuthActions =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logOut>
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof stopRedirectToProducts>
  ;
