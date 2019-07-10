import { IReduxAction } from "../../../types/interfaces";
import { IProductDetailed } from "../interfaces";

export enum ProductViewActionTypes {
  FETCH_PRODUCT = 'FETCH_PRODUCT',
  FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE',
}

export const fetchProduct = (productId: number)
  : IReduxAction<number, void, void, ProductViewActionTypes.FETCH_PRODUCT> => {
  return {
    type: ProductViewActionTypes.FETCH_PRODUCT,
    data: productId,
  }
}

export const fetchProductSuccess = (product: IProductDetailed)
  : IReduxAction<IProductDetailed, void, void, ProductViewActionTypes.FETCH_PRODUCT_SUCCESS> => {
  return {
    type: ProductViewActionTypes.FETCH_PRODUCT_SUCCESS,
    data: product,
  }
}

export const fetchProductFailure = (errMessage: string)
  : IReduxAction<string, void, void, ProductViewActionTypes.FETCH_PRODUCT_FAILURE> => {
  return {
    type: ProductViewActionTypes.FETCH_PRODUCT_FAILURE,
    data: errMessage,
  }
}

export type ProductViewAction =
  | ReturnType<typeof fetchProduct>
  | ReturnType<typeof fetchProductSuccess>
  | ReturnType<typeof fetchProductFailure>
  ;