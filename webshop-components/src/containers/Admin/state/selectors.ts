import { IStore } from '../../../state/store';
import {
  AdminViewType,
  IAdminUserData,
} from '../interfaces';

export const adminViewSelector = (store: IStore): AdminViewType => {
  return store.admin.activeView;
}

export const isFetchingUserDataSelector = (store: IStore): boolean => {
  return store.admin.users.meta.fetching;
}

export const isUsersDataLoadedSelector = (store: IStore): boolean => {
  return !store.admin.users.meta.fetching;
}

export const usersDataSelector = (store: IStore): IAdminUserData[] => {
  return store.admin.users.data;
}
