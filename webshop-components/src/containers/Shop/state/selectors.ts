import { IShoppingState, IProduct } from '../interfaces';
import { createSelector } from 'reselect';

export const productsSelector = (state: IShoppingState): IProduct[] => {
  return (state as any).shop.products;
};

export const getProductsSelector = createSelector(
  [productsSelector],
  (products) => products,
);
