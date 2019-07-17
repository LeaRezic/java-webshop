import { IAuthState, IAuthToken } from '../interfaces';
import { AuthActions, AuthActionTypes } from './actions';

const initialState: IAuthState = {
  token: {
    email: null,
    expireTime: null,
    isAdmin: false,
    tokenId: null,
  },
  meta: {
    isRequestingAuth: false,
    authSuccess: false,
    authError: null,
    shouldRedirect: false,
    redirectDest: '/products',
  }
}

const authRequest = (state: IAuthState): IAuthState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingAuth: true,
    }
  }
}

const authSuccess = (state: IAuthState, token: IAuthToken): IAuthState => {
  return {
    ...state,
    token: {
      email: token.email,
      expireTime: token.expireTime,
      isAdmin: token.isAdmin,
      tokenId: token.tokenId,
    },
    meta: {
      ...state.meta,
      isRequestingAuth: false,
      authSuccess: true,
      authError: null,
      shouldRedirect: true,
    }
  }
}

const authFailure = (state: IAuthState, error: string): IAuthState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingAuth: false,
      authSuccess: false,
      authError: error,
    }
  }
}

const logOut = (): IAuthState => {
  return {
    ...initialState,
    meta: {
      ...initialState.meta,
      shouldRedirect: true,
      redirectDest: '/products',
    }
  };
}

const setRedirectDest = (state: IAuthState, path: string): IAuthState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      redirectDest: path,
    }
  }
}

const stopRedirect = (state: IAuthState): IAuthState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      shouldRedirect: false,
    }
  }
}

const clearAuthError = (state: IAuthState): IAuthState => {
  return {
    ...state,
      meta: {
        ...state.meta,
        authError: null,
      }
  }
}

export const authReducer = (state: IAuthState = initialState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_REQUEST: return authRequest(state);
    case AuthActionTypes.AUTH_SUCCESS: return authSuccess(state, action.data!);
    case AuthActionTypes.AUTH_FAILURE: return authFailure(state, action.data!);
    case AuthActionTypes.LOG_OUT: return logOut();
    case AuthActionTypes.SET_REDIRECT_DEST: return setRedirectDest(state, action.data);
    case AuthActionTypes.STOP_REDIRECT: return stopRedirect(state);
    case AuthActionTypes.CLEAR_ERROR: return clearAuthError(state);
    default: return state;
  }
};
