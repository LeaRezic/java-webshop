import { IProduct, ICategory } from '../interfaces';
import { IReduxAction } from '../../../typings/interfaces';

export enum ShoppingActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  INIT_CART = 'INIT_CART',
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY',
  DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY',
  SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE',
  CHANGE_FILTER_CATEGORY = 'CHANGE_FILTER_CATEGORY',
  ADD_FILTER_SUBCATEGORIES = 'ADD_FILTER_SUBCATEGORIES',
  REMOVE_FILTER_SUBCATEGORIES = 'REMOVE_FILTER_SUBCATEGORIES',
}

export interface ISetQuantity {
  productId: number;
  quantity: number;
}

export const fetchProducts = ()
  :IReduxAction<void, void, void, ShoppingActionTypes.FETCH_PRODUCTS> => {
  return {
    type: ShoppingActionTypes.FETCH_PRODUCTS,
  }
}

export const fetchProductsSuccess = (products: IProduct[])
  :IReduxAction<IProduct[], void, void, ShoppingActionTypes.FETCH_PRODUCTS_SUCCESS> => {
  return {
    type: ShoppingActionTypes.FETCH_PRODUCTS_SUCCESS,
    data: products,
  }
}

export const fetchProductsFailure = (errMessage: string)
  :IReduxAction<string, void, void, ShoppingActionTypes.FETCH_PRODUCTS_FAILURE> => {
  return {
    type: ShoppingActionTypes.FETCH_PRODUCTS_FAILURE,
    data: errMessage,
  }
}

export const addProductToCart = (productId: number)
  :IReduxAction<number, void, void, ShoppingActionTypes.ADD_PRODUCT_TO_CART> => {
  return {
    type: ShoppingActionTypes.ADD_PRODUCT_TO_CART,
    data: productId,
  }
}

export const removeProductFromCart = (productId: number)
  :IReduxAction<number, void, void, ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART> => {
  return {
    type: ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART,
    data: productId,
  }
}

export const clearCart = ()
  :IReduxAction<void, void, void, ShoppingActionTypes.CLEAR_CART> => {
  return {
    type: ShoppingActionTypes.CLEAR_CART,
  }
}

export const incrementProductQuantity = (productId: number)
  :IReduxAction<number, void, void, ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY> => {
  return {
    type: ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY,
    data: productId,
  }
}

export const decrementProductQuantity = (productId: number)
  :IReduxAction<number, void, void, ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY> => {
  return {
    type: ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY,
    data: productId,
  }
}

export const setProductQuantity = (productId: number, quantity: number)
  :IReduxAction<ISetQuantity, void, void, ShoppingActionTypes.SET_PRODUCT_QUANTITY> => {
  const data: ISetQuantity = {
    productId: productId,
    quantity: quantity,
  }
  return {
    type: ShoppingActionTypes.SET_PRODUCT_QUANTITY,
    data: data,
  }
}

export const fetchCategories = ()
  : IReduxAction<void, void, void, ShoppingActionTypes.FETCH_CATEGORIES> => {
  return {
    type: ShoppingActionTypes.FETCH_CATEGORIES,
  }
}

export const fetchCategoriesSuccess = (categories: ICategory[])
  : IReduxAction<ICategory[], void, void, ShoppingActionTypes.FETCH_CATEGORIES_SUCCESS> => {
  return {
    type: ShoppingActionTypes.FETCH_CATEGORIES_SUCCESS,
    data: categories,
  }
}

export const fetchCategoriesFailure = (errMessage: string)
  : IReduxAction<string, void, void, ShoppingActionTypes.FETCH_CATEGORIES_FAILURE> => {
  return {
    type: ShoppingActionTypes.FETCH_CATEGORIES_FAILURE,
    data: errMessage,
  }
}

export const changeFilterCategory = (categoryId: number)
  : IReduxAction<number, void, void, ShoppingActionTypes.CHANGE_FILTER_CATEGORY> => {
  return {
    type: ShoppingActionTypes.CHANGE_FILTER_CATEGORY,
    data: categoryId,
  }
}

export const addFilterSubcategories = (subcategoryIds: number[])
  : IReduxAction<number[], void, void, ShoppingActionTypes.ADD_FILTER_SUBCATEGORIES> => {
  return {
    type: ShoppingActionTypes.ADD_FILTER_SUBCATEGORIES,
    data: subcategoryIds,
  }
}

export const removeFilterSubcategories = (subcategoryIds: number[])
  : IReduxAction<number[], void, void, ShoppingActionTypes.REMOVE_FILTER_SUBCATEGORIES> => {
  return {
    type: ShoppingActionTypes.REMOVE_FILTER_SUBCATEGORIES,
    data: subcategoryIds,
  }
}

export type ProductsAction =
  | ReturnType<typeof fetchProducts>
  | ReturnType<typeof fetchProductsSuccess>
  | ReturnType<typeof fetchProductsFailure>
  | ReturnType<typeof addProductToCart>
  | ReturnType<typeof removeProductFromCart>
  | ReturnType<typeof clearCart>
  | ReturnType<typeof incrementProductQuantity>
  | ReturnType<typeof decrementProductQuantity>
  | ReturnType<typeof setProductQuantity>
  | ReturnType<typeof fetchCategories>
  | ReturnType<typeof fetchCategoriesSuccess>
  | ReturnType<typeof fetchCategoriesFailure>
  | ReturnType<typeof changeFilterCategory>
  | ReturnType<typeof addFilterSubcategories>
  | ReturnType<typeof removeFilterSubcategories>
  ;
