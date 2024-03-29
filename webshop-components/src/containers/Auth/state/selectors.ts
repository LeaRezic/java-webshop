import { IStore } from '../../../state/store';

export const isAuthenticatedSelector = (state: IStore): boolean => {
  return state.auth.token !== null
    && state.auth.token.tokenId !== null
    && state.auth.token.tokenId.trim().length > 0;
};

export const isAdminSelector = (state: IStore): boolean => {
  return state.auth.token.isAdmin;
};

export const usernameSelector = (state: IStore): string => {
  return state.auth.token.email;
};

export const shouldRedirectSelector = (state: IStore): boolean => {
  return state.auth.meta.shouldRedirect;
}

export const redirectDestSelector = (state: IStore): string => {
  return state.auth.meta.redirectDest;
}

export const authTokenSelector = (state: IStore): string => {
  return state.auth.token.tokenId;
}

export const authErrorSelector = (state: IStore): string => {
  return state.auth.meta.authError;
}
