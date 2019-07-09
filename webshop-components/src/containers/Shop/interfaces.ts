
export interface IProduct {
  productId: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
}

export interface ISubCategory {
  id: number;
  name: string;
}
export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubCategory[];
}

export interface IShoppingPageMappedProps {
  products: IProduct[];
  cartItems: ICartItem[];
  categories: ICategory[];
}

export interface IShoppingPageMappedDispatch {
  onProductsFetch: () => void;
  onAddProduct: (product: IProduct) => void;
  onRemoveProduct: (product: IProduct) => void;
  onIncrementProduct: (product: IProduct) => void;
  onDecrementProduct: (product: IProduct) => void;
  onCategoriesFetch: () => void;
  onAddSubcategories: (ids: number[]) => void;
  onRemoveSubcategories: (ids: number[]) => void;
}

export interface IShoppingState {
  products: IProduct[];
  cart: ICart;
  categories: ICategory[];
  selectedSubcategoryIds: number[];
  meta: {
    fetchingProducts: boolean;
    productsLoaded: boolean;
    fetchingCategories: boolean;
    categoriesLoaded: boolean;
    isShopping: boolean;
    isCheckout: boolean;
    error: string | null;
  }
}

export type IShoppingPageProps =
  & IShoppingPageMappedProps
  & IShoppingPageMappedDispatch
  ;
