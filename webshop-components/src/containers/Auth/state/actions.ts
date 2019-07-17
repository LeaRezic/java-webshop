import { IReduxAction } from '../../../typings/interfaces';
import { IAuthToken } from '../interfaces';

export enum AuthActionTypes {
  AUTH_REQUEST = 'AUTH_REQUEST',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  LOG_OUT = 'LOG_OUT',
  SET_REDIRECT_DEST = 'SET_REDIRECT_DEST',
  STOP_REDIRECT = 'STOP_REDIRECT',
  CLEAR_ERROR = 'CLEAR_ERROR',
  AUTO_SIGN_IN = 'AUTO_SIGN_IN',
}

export interface IUserRequestInfo {
  username: string;
  password: string;
  isRegister: boolean;
}

export const authRequest = (userInfo: IUserRequestInfo)
  :IReduxAction<IUserRequestInfo, void, void, AuthActionTypes.AUTH_REQUEST> => {
  return {
    type: AuthActionTypes.AUTH_REQUEST,
    data: userInfo,
  };
}

export const authSuccess = (userInfo: IAuthToken)
  :IReduxAction<IAuthToken, void, void, AuthActionTypes.AUTH_SUCCESS> => {
  return {
    type: AuthActionTypes.AUTH_SUCCESS,
    data: userInfo,
  };
}

export const authFailure = (error: string)
  :IReduxAction<string, void, void, AuthActionTypes.AUTH_FAILURE> => {
  return {
    type: AuthActionTypes.AUTH_FAILURE,
    data: error,
  };
}

export const logOut = ()
  : IReduxAction<void, void, void, AuthActionTypes.LOG_OUT> => {
  return {
    type: AuthActionTypes.LOG_OUT,
  };
}

export const setRedirectDest = (destination: string)
  : IReduxAction<string, void, void, AuthActionTypes.SET_REDIRECT_DEST> => {
  return {
    type: AuthActionTypes.SET_REDIRECT_DEST,
    data: destination,
  };
}

export const stopRedirectToProducts = ()
  : IReduxAction<void, void, void, AuthActionTypes.STOP_REDIRECT> => {
  return {
    type: AuthActionTypes.STOP_REDIRECT,
  };
}

export const clearError = ()
  : IReduxAction<void, void, void, AuthActionTypes.CLEAR_ERROR> => {
  return {
    type: AuthActionTypes.CLEAR_ERROR,
  };
}

export const autoSignIn = ()
  : IReduxAction<void, void, void, AuthActionTypes.AUTO_SIGN_IN> => {
  return {
    type: AuthActionTypes.AUTO_SIGN_IN,
  };
}

export type AuthActions =
  | ReturnType<typeof authRequest>
  | ReturnType<typeof authSuccess>
  | ReturnType<typeof authFailure>
  | ReturnType<typeof logOut>
  | ReturnType<typeof setRedirectDest>
  | ReturnType<typeof stopRedirectToProducts>
  | ReturnType<typeof clearError>
  | ReturnType<typeof autoSignIn>
  ;
