
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

export interface IProductsState {
  products?: IProduct[];
  cart: ICart;
  meta: {
    fetchingProducts: boolean;
    productsLoaded: boolean;
    isShopping: boolean;
    isCheckout: boolean;
    error?: string;
  }
}