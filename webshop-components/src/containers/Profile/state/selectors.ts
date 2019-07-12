import { IStore } from '../../../state/store';
import { IReceiptDetailed } from '../interfaces';

export const receiptsSelector = (store: IStore): IReceiptDetailed[] => {
  return store.profile.receipts;
}

export const loadingHistorySelector = (store: IStore): boolean => {
  return store.profile.meta.isRequestingHistory;
};

export const historyLoadedSelector = (store: IStore): boolean => {
  return store.profile.meta.isRequestingHistory === false
    && store.profile.meta.historySuccess === true;
};
