import { IAuthState } from '../interfaces';
import { AuthActions, AuthActionTypes, IUserResponseInfo } from './actions';

const initialState: IAuthState = {
  isAuthenticated: false,
  isAdmin: false,
  userName: '',
  meta: {
    isRequestingLogin: false,
    isRequestingRegister: false,
    loginSuccess: false,
    registerSuccess: false,
    loginError: '',
    registerError: '',
  }
}

const loginRequest = (state: IAuthState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingLogin: true,
    }
  }
}

const loginSuccess = (state: IAuthState, userData: IUserResponseInfo) => {
  return {
    ...state,
    isAuthenticated: true,
    isAdmin: userData.isAdmin,
    userName: userData.username,
    meta: {
      ...state.meta,
      isRequestingLogin: false,
      loginSuccess: true,
    }
  }
}

const loginFailure = (state: IAuthState, error: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingLogin: false,
      loginSuccess: false,
      loginError: error,
    }
  }
}

const logOut = () => {
  return initialState;
}

const registerRequest = (state: IAuthState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingRegister: true,
    }
  }
}

const registerSuccess = (state: IAuthState, userData: IUserResponseInfo) => {
  return {
    ...state,
    isAuthenticated: true,
    isAdmin: userData.isAdmin,
    userName: userData.username,
    meta: {
      ...state.meta,
      isRequestingRegister: false,
      registerSuccess: true,
    }
  }
}

const registerFailure = (state: IAuthState, error: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingRegister: false,
      registerSuccess: false,
      registerError: error,
    }
  }
}

export const authReducer = (state: IAuthState = initialState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_REQUEST: return loginRequest(state);
    case AuthActionTypes.LOG_IN_SUCCESS: return loginSuccess(state, action.data!);
    case AuthActionTypes.LOG_IN_FAILURE: return loginFailure(state, action.data!);
    case AuthActionTypes.LOG_OUT: return logOut();
    case AuthActionTypes.REGISTER_REQUEST: return registerRequest(state);
    case AuthActionTypes.REGISTER_SUCCESS: return registerSuccess(state, action.data!);
    case AuthActionTypes.REGISTER_FAILURE: return registerFailure(state, action.data!);
    default: return state;
  }
};
