import { IProduct, ICartItem, ICategory } from '../interfaces';
import { createSelector } from 'reselect';
import { IStore } from '../../../state/store';

const productsSelector = (state: IStore): IProduct[] => {
  return state.shop.products;
};

export const categoriesSelector = (state: IStore): ICategory[] => {
  return state.shop.categories;
};

export const selectedSubcategoryIdsSelector = (state: IStore): number[] => {
  if (!state.shop.selectedSubcategoryIds.length) {
    const initial: number[] = [];
    return state.shop.categories.reduce((prev, curr) => {
      curr.subcategories.forEach((sb) => prev.push(sb.id));
      return prev;
    }, initial);
  }
  return state.shop.selectedSubcategoryIds;
};

export const selectedCategoryIdSelector = (state: IStore): number => {
  return state.shop.selectedCategoryId;
};

export const cartItemsSelector = (state: IStore): ICartItem[] => {
  return state.shop.cart.items;
};

export const getProductsSelector = createSelector(
  [productsSelector, selectedSubcategoryIdsSelector],
  (products, subcategories) => products.filter((prod) => subcategories.includes(prod.subcategoryId) === true)
);

export const fetchingDataSelector = (state: IStore): boolean => {
  return state.shop.meta.fetchingData;
};

export const dataLoadedSelector = (state: IStore): boolean => {
  return state.shop.meta.dataLoaded;
};

export const errorSelector = (state: IStore): string => {
  return state.shop.meta.error;
};
