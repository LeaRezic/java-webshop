import { IProductDetailed } from '../interfaces';
import { IStore } from '../../../state/store';

export const productViewSelector = (state: IStore): IProductDetailed => {
  return state.productView.product;
}

export const isFetchingData = (state: IStore): boolean => {
  return state.productView.meta.isFetchingData;
}

export const dataLoadedSelector = (state: IStore): boolean => {
  return state.productView.meta.dataLoaded;
}

export const errorSelector = (state: IStore): string => {
  return state.productView.meta.error;
}
