import { IProduct, ICartItem } from '../interfaces';
import { createSelector } from 'reselect';
import { IStore } from '../../../state/store';

export const productsSelector = (state: IStore): IProduct[] => {
  return state.shop.products;
};

export const cartItemsSelector = (state: IStore): ICartItem[] => {
  return state.shop.cart.items;
};

export const getProductsSelector = createSelector(
  [productsSelector],
  (products) => products,
);
