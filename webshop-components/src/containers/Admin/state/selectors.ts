import { IStore } from '../../../state/store';
import { AdminViewType, IAdminUserData, ILoginLog } from '../interfaces';
import { IReceiptDetailed } from '../../Profile/interfaces';
import { createSelector } from 'reselect';

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

export const isFetchingLogsSelector = (store: IStore): boolean => {
  return store.admin.logs.meta.fetching;
}

export const isLogDataLoadedSelector = (store: IStore): boolean => {
  return !store.admin.logs.meta.fetching;
}

const allLogDataSelector = (store: IStore): ILoginLog[] => {
  return store.admin.logs.data;
}

const logUsernameFilterSelector = (store: IStore): string => {
  return store.admin.logs.usernameFilter;
}

export const logDataSelector = createSelector(
  [allLogDataSelector, logUsernameFilterSelector],
  (logs: ILoginLog[], username: string) => {
    if (!username) {
      return logs;
    }
    return logs.filter((log) => log.username === username);
  }
);

export const isFetchingReceiptsSelector = (store: IStore): boolean => {
  return store.admin.receipts.meta.fetching;
}

export const isReceiptsDataLoadedSelector = (store: IStore): boolean => {
  return !store.admin.receipts.meta.fetching;
}

const allReceiptsDataSelector = (store: IStore): IReceiptDetailed[] => {
  return store.admin.receipts.data;
}

const receiptsUsernameFilterSelector = (store: IStore): string => {
  return store.admin.receipts.usernameFilter;
}

export const receiptsDataSelector = createSelector(
  [allReceiptsDataSelector, receiptsUsernameFilterSelector],
  (receipts: IReceiptDetailed[], username: string) => {
    if (username === null) {
      return receipts;
    }
    return receipts.filter((receipt) => receipt.username === username);
  }
);
