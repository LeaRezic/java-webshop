import {
  IShoppingState,
  ICartItem,
  IProduct,
  ICategory,
} from '../interfaces';
import {
  ProductsAction,
  ShoppingActionTypes,
} from './actions';

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

const fetchProducts = (state: IShoppingState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingProducts: true,
    }
  };
}

const fetchProductsSuccess = (state: IShoppingState, products: IProduct[]) => {
  return {
    ...state,
    products: products,
    meta: {
      ...state.meta,
      fetchingProducts: false,
      productsLoaded: true,
    }
  };
}

const fetchProductsFailure = (state: IShoppingState, errorMsg: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingProducts: false,
      productsLoaded: false,
      error: errorMsg,
    }
  }
}

const addProductToCart = (state: IShoppingState, product: IProduct) => {
  const newItem: ICartItem = {
    product: product,
    quantity: 1,
  }
  return {
    ...state,
    cart: {
      items: state.cart.items.concat(newItem),
    },
  }
}

const removeProductFromCart = (state: IShoppingState, product: IProduct) => {
  const id: number = product.productId;
  return {
    ...state,
    cart: {
      items: state.cart.items.filter((item) => item.product.productId !== id),
    },
  };
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
    }
  };
}

const fetchCategories = (state: IShoppingState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingCategories: true,
    },
  };
}

const fetchCategoriesSuccess = (state: IShoppingState, categories: ICategory[]) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingCategories: false,
      categoriesLoaded: true,
    },
    categories: categories,
  };
}

const fetchCategoriesFailure = (state: IShoppingState, errMsg: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingCategories: false,
      categoriesLoaded: false,
      error: errMsg,
    },
  };
}

const addFilterSubcategories = (state: IShoppingState, ids: number[]) => {
  return {
    ...state,
    selectedSubcategoryIds: state.selectedSubcategoryIds.concat(ids),
  }
}

const removeFilterSubcategories = (state: IShoppingState, ids: number[]) => {
  return {
    ...state,
    selectedSubcategoryIds: state.selectedSubcategoryIds.filter((id) => !ids.includes(id)),
  }
}

export function shoppingReducer(state: IShoppingState = initialState, action: ProductsAction): IShoppingState {
  switch (action.type) {
    case ShoppingActionTypes.FETCH_PRODUCTS: return fetchProducts(state);
    case ShoppingActionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action.data as IProduct[]);
    case ShoppingActionTypes.FETCH_PRODUCTS_FAILURE: return fetchProductsFailure(state, action.data as string);
    case ShoppingActionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action.data as IProduct);
    case ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART: return removeProductFromCart(state, action.data as IProduct);
    case ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY: return changeQuantity(state, (action.data as IProduct).productId, 1);
    case ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY: return changeQuantity(state, (action.data as IProduct).productId, -1);
    case ShoppingActionTypes.FETCH_CATEGORIES: return fetchCategories(state);
    case ShoppingActionTypes.FETCH_CATEGORIES_SUCCESS: return fetchCategoriesSuccess(state, action.data as ICategory[]);
    case ShoppingActionTypes.FETCH_CATEGORIES_FAILURE: return fetchCategoriesFailure(state, action.data as string);
    case ShoppingActionTypes.ADD_FILTER_SUBCATEGORIES: return addFilterSubcategories(state, action.data as number[]);
    case ShoppingActionTypes.REMOVE_FILTER_SUBCATEGORIES: return removeFilterSubcategories(state, action.data as number[]);
    default: return state;
  }
}
