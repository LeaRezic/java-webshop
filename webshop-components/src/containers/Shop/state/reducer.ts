import {
  IShoppingState,
  ICartItem,
  IProduct,
  ICategory,
  ISubCategory,
} from '../interfaces';
import {
  ProductsAction,
  ShoppingActionTypes,
  ISetQuantity,
} from './actions';

const initialState: IShoppingState = {
  products: [],
  cart: {
    items: [],
  },
  categories: [],
  selectedCategoryId: 0,
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

const addProductToCart = (state: IShoppingState, productId: number) => {
  if (state.cart.items.some((item) => item.product.id === productId)) {
    return changeQuantity(state, productId, +1);
  }
  if (!state.products.some((prod) => prod.id === productId)) {
    return state;
  }
  const newItem: ICartItem = {
    product: state.products.find((prod) => prod.id === productId)!,
    quantity: 1,
  }
  return {
    ...state,
    cart: {
      items: state.cart.items.concat(newItem),
    },
  }
}

const removeProductFromCart = (state: IShoppingState, productId: number) => {
  return {
    ...state,
    cart: {
      items: state.cart.items.filter((item) => item.product.id !== productId),
    },
  };
}

const changeQuantity = (state: IShoppingState, productId: number, quantityDiff: number) => {
  if (!state.cart.items.some((item) => item.product.id === productId)) {
    return state;
  }
  let items = state.cart.items.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }
    return {
      product: item.product,
      quantity: item.quantity + quantityDiff,
    }
  })
  items = items.filter((item) => item.quantity > 0);
  return {
    ...state,
    cart: {
      ...state.cart,
      items: items,
    }
  };
}

const setQuantity = (state: IShoppingState, productQuantity: ISetQuantity) => {
  if (!state.cart.items.some((item) => item.product.id === productQuantity.productId)) {
    return state;
  }
  let items = state.cart.items.map((item) => {
    if (item.product.id !== productQuantity.productId) {
      return item;
    }
    return {
      product: item.product,
      quantity: productQuantity.quantity,
    }
  })
  items = items.filter((item) => item.quantity > 0);
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

const getAllSubcatIdsForCategory = (subcategories: ISubCategory[]) => {
  const initial: number[] = [];
  return subcategories.reduce((prev, curr) => {
    return prev.concat(curr.id);
  }, initial);
}

const changeFilterCategory = (state: IShoppingState, id: number) => {
  if (id === 0) {
    return {
      ...state,
      selectedCategoryId: id,
      selectedSubcategoryIds: [],
    }
  }
  const category = state.categories.find((cat) => cat.id === id);
  return {
    ...state,
    selectedCategoryId: id,
    selectedSubcategoryIds: getAllSubcatIdsForCategory(category!.subcategories),
  }
}

const addFilterSubcategories = (state: IShoppingState, ids: number[]) => {
  return {
    ...state,
    selectedSubcategoryIds: state.selectedSubcategoryIds.concat(ids),
  }
}

const removeFilterSubcategories = (state: IShoppingState, ids: number[]) => {
  const subcats = state.selectedSubcategoryIds.filter((id) => !ids.includes(id));
  if (subcats.length === 0) {
    return {
      ...state,
      selectedCategoryId: 0,
      selectedSubcategoryIds: [],
    }
  }
  return {
    ...state,
    selectedSubcategoryIds: state.selectedSubcategoryIds.filter((id) => !ids.includes(id)),
  }
}

const clearCart = (state: IShoppingState) => {
  return {
    ...state,
    cart: {
      items: [],
    },
  }
}

export function shoppingReducer(state: IShoppingState = initialState, action: ProductsAction): IShoppingState {
  switch (action.type) {
    case ShoppingActionTypes.FETCH_PRODUCTS: return fetchProducts(state);
    case ShoppingActionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action.data!);
    case ShoppingActionTypes.FETCH_PRODUCTS_FAILURE: return fetchProductsFailure(state, action.data!);
    case ShoppingActionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action.data!);
    case ShoppingActionTypes.REMOVE_PRODUCT_FROM_CART: return removeProductFromCart(state, action.data!);
    case ShoppingActionTypes.CLEAR_CART: return clearCart(state);
    case ShoppingActionTypes.INCREMENT_PRODUCT_QUANTITY: return changeQuantity(state, action.data!, 1);
    case ShoppingActionTypes.DECREMENT_PRODUCT_QUANTITY: return changeQuantity(state, action.data!, -1);
    case ShoppingActionTypes.SET_PRODUCT_QUANTITY: return setQuantity(state, action.data!);
    case ShoppingActionTypes.FETCH_CATEGORIES: return fetchCategories(state);
    case ShoppingActionTypes.FETCH_CATEGORIES_SUCCESS: return fetchCategoriesSuccess(state, action.data!);
    case ShoppingActionTypes.FETCH_CATEGORIES_FAILURE: return fetchCategoriesFailure(state, action.data!);
    case ShoppingActionTypes.CHANGE_FILTER_CATEGORY: return changeFilterCategory(state, action.data!);
    case ShoppingActionTypes.ADD_FILTER_SUBCATEGORIES: return addFilterSubcategories(state, action.data!);
    case ShoppingActionTypes.REMOVE_FILTER_SUBCATEGORIES: return removeFilterSubcategories(state, action.data!);
    default: return state;
  }
}
