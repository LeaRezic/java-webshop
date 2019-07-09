import { IProduct, ICartItem, ICategory } from '../interfaces';
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

export const categoriesSelector = (state: IStore): ICategory[] => {
  return state.shop.categories;
};
