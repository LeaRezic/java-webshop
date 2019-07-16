import { IStore } from '../../../state/store';

export const redirectToProfileSelector = (store: IStore): boolean => {
  return store.checkout.meta.shouldRedirectToProfile;
};

export const createReceiptErrorSelector = (store: IStore): string => {
  return store.checkout.meta.receiptCreatedError;
};
