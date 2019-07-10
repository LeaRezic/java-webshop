import { IProductDetailed } from '../interfaces';
import { IStore } from '../../../state/store';

export const productViewSelector = (state: IStore): IProductDetailed | null => {
  return state.productView.product;
}
