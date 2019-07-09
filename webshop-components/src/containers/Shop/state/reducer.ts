import { IShoppingState, ICartItem, IProduct, ICategory } from '../interfaces';
import { ProductsAction, ShoppingActionTypes } from './actions';
import { metaProperty } from '@babel/types';

const initialState: IShoppingState = {
  products: [],
  cart: {
    items: [],
  },
  categories: [],
  selectedSubcategoryIds: [],
  meta: {
    fetchingProducts: false,
    productsLoaded: false,
    fetchingCategories: false,
    categoriesLoaded: false,
    isCheckout: false,
    isShopping: true,
    error: null,
  }
}

const changeQuantity = (state: IShoppingState, productId: number, quantityDiff: number) => {
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

export function shoppingReducer(state: IShoppingState = initialState, action: ProductsAction): IShoppingState {
  switch (action.type) {
    case ShoppingActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingProducts: true,
        }
      };
    case ShoppingActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.data as IProduct[],
        meta: {
          ...state.meta,
          fetchingProducts: false,
          productsLoaded: true,
        }
      };
    case ShoppingActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingProducts: false,
          productsLoaded: false,
          error: action.data as string,
        }
      }
    case ShoppingActionTypes.ADD_PRODUCT_TO_CART:
      const newItem: ICartItem = {
        product: action.data as IProduct,
        quantity: 1,
      }
      return {
        ...state,
        cart: {
          items: state.cart.items.concat(newItem),
        },
      }
    case ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART:
      const id: number = (action.data as IProduct).productId;
      return {
        ...state,
        cart: {
          items: state.cart.items.filter((item) => item.product.productId !== id),
        },
      };
    case ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY:
      return changeQuantity(state, (action.data as IProduct).productId, 1);
    case ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY:
      return changeQuantity(state, (action.data as IProduct).productId, -1);
    case ShoppingActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingCategories: true,
        },
      };
    case ShoppingActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingCategories: false,
          categoriesLoaded: true,
        },
        categories: action.data as ICategory[],
      };
    case ShoppingActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        meta: {
          ...state.meta,
          fetchingCategories: false,
          categoriesLoaded: false,
          error: action.data as string,
        },
      };
    case ShoppingActionTypes.ADD_FILTER_CATEGORY:

    default:
      return state;
  }
}
