import { IShoppingState, IProduct } from '../interfaces';
import { createSelector } from 'reselect';

export const productsSelector = (state: IShoppingState): IProduct[] => {
  console.log(state);
  return (state as any).shop.products;
};

export const getProductsSelector = createSelector(
  [productsSelector],
  (products) => products,
);
