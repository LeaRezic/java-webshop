import { IProduct, ICartItem, ICategory, ISubCategory } from '../interfaces';
import { createSelector } from 'reselect';
import { IStore } from '../../../state/store';

export const productsSelector = (state: IStore): IProduct[] => {
  return state.shop.products;
};

export const categoriesSelector = (state: IStore): ICategory[] => {
  return state.shop.categories;
}

export const selectedSubcategoryIdsSelector = (state: IStore): number[] => {
  if (!state.shop.selectedSubcategoryIds.length) {
    const initial: number[] = [];
    return state.shop.categories.reduce((prev, curr) => {
      curr.subcategories.forEach((sb) => prev.push(sb.id));
      return prev;
    }, initial);
  }
  return state.shop.selectedSubcategoryIds;
}

export const selectedCategoryIdSelector = (state: IStore): number => {
  return state.shop.selectedCategoryId;
}

export const selectedCategories = createSelector(
  [selectedSubcategoryIdsSelector, categoriesSelector],
  (subcatIds, categories) => {
    const set: Set<ICategory> = new Set();
    for (const cat of categories) {
      for (const subcat of cat.subcategories) {
        if (subcatIds.some((id) => id === subcat.id)) {
          set.add(cat);
        }
      }
    }
    return Array.from(set.values());
  }
);

export const cartItemsSelector = (state: IStore): ICartItem[] => {
  return state.shop.cart.items;
};

export const getProductsSelector = createSelector(
  [productsSelector, selectedSubcategoryIdsSelector],
  (products, subcategories) => products.filter((prod) => subcategories.includes(prod.subcategoryId) === true)
);
