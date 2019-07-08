import { IProduct } from '../interfaces';
import { IReduxAction } from '../../../types/interfaces';

export enum ShoppingActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  INIT_CART = 'INIT_CART',
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
  INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY',
  DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY',
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

export const addProductToCart = (product: IProduct)
  :IReduxAction<IProduct, void, void, ShoppingActionTypes.ADD_PRODUCT_TO_CART> => {
  return {
    type: ShoppingActionTypes.ADD_PRODUCT_TO_CART,
    data: product,
  }
}

export const removeProductFromCart = (product: IProduct)
  :IReduxAction<IProduct, void, void, ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART> => {
  return {
    type: ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART,
    data: product,
  }
}

export const incrementProductQuantity = (product: IProduct)
  :IReduxAction<IProduct, void, void, ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY> => {
  return {
    type: ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY,
    data: product,
  }
}

export const decrementProductQuantity = (product: IProduct)
  :IReduxAction<IProduct, void, void, ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY> => {
  return {
    type: ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY,
    data: product,
  }
}

export type ProductsAction =
  | ReturnType<typeof fetchProducts>
  | ReturnType<typeof fetchProductsSuccess>
  | ReturnType<typeof fetchProductsFailure>
  | ReturnType<typeof addProductToCart>
  | ReturnType<typeof removeProductFromCart>
  | ReturnType<typeof incrementProductQuantity>
  | ReturnType<typeof decrementProductQuantity>
  ;
