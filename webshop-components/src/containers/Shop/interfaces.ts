
export interface IProduct {
  productId: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
}

export interface IItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: IItem[];
}

export interface IShoppingPageMappedProps {
  products: IProduct[];
}

export interface IShoppingPageMappedDispatch {
  onProductsFetch: () => void;
  onAddProduct: (product: IProduct) => void;
  onRemoveProduct: (product: IProduct) => void;
  onIncrementProduct: (product: IProduct) => void;
  onDecrementProduct: (product: IProduct) => void;
}

export interface IShoppingState {
  products: IProduct[];
  cart: ICart;
  meta: {
    fetchingProducts: boolean;
    productsLoaded: boolean;
    isShopping: boolean;
    isCheckout: boolean;
    error: string | null;
  }
}

export type IShoppingPageProps =
  & IShoppingPageMappedProps
  & IShoppingPageMappedDispatch
  ;
