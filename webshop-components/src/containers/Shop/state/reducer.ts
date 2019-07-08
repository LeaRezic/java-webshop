import { IProductsState, IItem, IProduct } from '../interfaces';
import { ProductsAction, ProductsActionTypes } from './actions';

const initialState: IProductsState = {
  products: [],
  cart: {
    items: [],
  },
  meta: {
    fetchingProducts: false,
    productsLoaded: false,
    isCheckout: false,
    isShopping: true,
    error: undefined,
  }
}

const changeQuantity = (state: IProductsState, productId: number, quantityDiff: number) => {
  if (!state.cart.items.some((item) => item.product.productId === productId)) {
    return state;
  }
  const items = state.cart.items.map((item) => {
    if (item.product.productId !== productId) {
      return item;
    }
    if (item.quantity + quantityDiff < 0) {
      return item;
    }
    return {
      product: item.product,
      quantity: item.quantity + quantityDiff,
    }
  })
  return {
    ...state,
    cart: {
      ...state.cart,
      items: items,
    } };
}

export function productsReducer(state: IProductsState = initialState, action: ProductsAction) {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingProducts: true,
        }
      };
    case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingProducts: false,
          productsLoaded: true,
          products: action.data,
        }
      };
    case ProductsActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingProducts: false,
          productsLoaded: false,
          error: action.data,
        }
      }
    case ProductsActionTypes.ADD_PRODUCT_TO_CART:
      const newItem: IItem = {
        product: action.data as IProduct,
        quantity: 1,
      }
      return {
        ...state,
        cart: {
          items: state.cart.items.concat(newItem),
        },
      }
    case ProductsActionTypes.REMOVE_PRODUCT_FROM_CART:
      const id: number = (action.data as IProduct).productId;
      return {
        ...state,
        cart: {
          items: state.cart.items.filter((item) => item.product.productId !== id),
        },
      };
    case ProductsActionTypes.INCREMENT_PRODUCT_QUANTITY:
      return changeQuantity(state, (action.data as IProduct).productId, 1);
    case ProductsActionTypes.DECREMENT_PRODUCT_QUANTITY:
      return changeQuantity(state, (action.data as IProduct).productId, -1);
    default:
      return state;
  }
}
