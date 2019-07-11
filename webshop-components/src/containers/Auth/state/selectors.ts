import { IStore } from '../../../state/store';

export const isAuthenticatedSelector = (state: IStore): boolean => {
  return state.auth.isAuthenticated;
};

export const isAdminSelector = (state: IStore): boolean => {
  return state.auth.isAdmin;
};

export const usernameSelector = (state: IStore): string => {
  return state.auth.userName;
};

export const shouldRedirectSelector = (state: IStore): boolean => {
  return state.auth.meta.shouldRedirectToProducts;
}
