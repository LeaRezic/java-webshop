import { IStore } from '../../../state/store';
import { IReceiptDetailed } from '../interfaces';

export const receiptsSelector = (store: IStore): IReceiptDetailed[] => {
  return store.profile.receipts;
}

export const isFetchingSelector = (store: IStore): boolean => {
  return store.profile.meta.fetchingData;
};

export const dataLoadedSelector = (store: IStore): boolean => {
  return store.profile.meta.fetchingData === false
    && store.profile.meta.dataLoaded === true;
};

export const errorSelector = (store: IStore): string => {
  return store.profile.meta.error;
};
