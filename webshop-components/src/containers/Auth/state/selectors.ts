import { createSelector } from 'reselect';

import { IStore } from '../../../state/store';

export const isAuthenticatedSelector = (state: IStore): boolean => {
  return state.auth.isAuthenticated;
};
