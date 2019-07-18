import { createSelector } from 'reselect';

import { IStore } from '../../../../state/store';
import { IAdminViewFilter, IAdminUserData } from '../../interfaces';
import { IReceiptDetailed } from '../../../Profile/interfaces';
import { usersDataSelector } from '../selectors';
import { getDateFromDisplayDateTime } from '../../../../utils/dateUtils';

export const isFetchingReceiptsSelector = (store: IStore): boolean => {
  return store.admin.receipts.meta.fetching;
}

export const isReceiptsDataLoadedSelector = (store: IStore): boolean => {
  return !store.admin.receipts.meta.fetching;
}

const receiptsDataSelector = (store: IStore): IReceiptDetailed[] => {
  return store.admin.receipts.data;
}

export const receiptsFilterSelector = (store: IStore): IAdminViewFilter => {
  return store.admin.receipts.filter;
}

export const receiptsSelectedUsersSelector = createSelector(
  [usersDataSelector, receiptsFilterSelector],
  (usersdata: IAdminUserData[], filter: IAdminViewFilter) => {
    if (filter.username === null) {
      return [];
    }
    return usersdata.filter((user) => user.username === filter.username);
  }
);

export const filteredReceiptsSelector = createSelector(
  [receiptsDataSelector, receiptsFilterSelector],
  (receipts: IReceiptDetailed[], filter: IAdminViewFilter) => {
    let filteredReceipts = [...receipts];
    if (filter.username !== null) {
      filteredReceipts = filteredReceipts.filter((receipt) => receipt.username === filter.username);
    }
    if (filter.from !== null) {
      filteredReceipts = filteredReceipts.filter((receipt) => getDateFromDisplayDateTime(receipt.basic.purchaseDate) >= filter.from);
    }
    if (filter.to !== null) {
      filteredReceipts = filteredReceipts.filter((receipt) => getDateFromDisplayDateTime(receipt.basic.purchaseDate) <= filter.to);
    }
    return filteredReceipts;
  }
);
