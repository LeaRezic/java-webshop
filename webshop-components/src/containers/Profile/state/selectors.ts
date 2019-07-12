import { IStore } from '../../../state/store';
import { IReceiptDetailed } from '../interfaces';

export const receiptsSelector = (store: IStore): IReceiptDetailed[] => {
  return store.profile.receipts;
}
