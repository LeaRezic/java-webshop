import {
  IProductViewState,
  IProductDetailed,
} from '../interfaces';
import {
  ProductViewActionTypes,
  ProductViewAction,
} from './actions';

const initialState: IProductViewState = {
  product: null,
  meta: {
    isFetchingData: false,
    dataLoaded: false,
    error: null,
  }
}

const fetchProduct = (state: IProductViewState): IProductViewState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isFetchingData: true,
      dataLoaded: false,
      error: null,
    }
  };
}

const fetchProductSuccess = (state: IProductViewState, product: IProductDetailed): IProductViewState => {
  return {
    ...state,
    product: product,
    meta: {
      ...state.meta,
      isFetchingData: false,
      dataLoaded: true,
      error: null,
    }
  };
}

const fetchProductFailure = (state: IProductViewState, errorMsg: string): IProductViewState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isFetchingData: false,
      dataLoaded: false,
      error: errorMsg,
    }
  }
}

export function productViewReducer(state: IProductViewState = initialState, action: ProductViewAction): IProductViewState {
  switch (action.type) {
    case ProductViewActionTypes.FETCH_PRODUCT: return fetchProduct(state);
    case ProductViewActionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action.data!);
    case ProductViewActionTypes.FETCH_PRODUCT_FAILURE: return fetchProductFailure(state, action.data!);
    default: return state;
  }
}
