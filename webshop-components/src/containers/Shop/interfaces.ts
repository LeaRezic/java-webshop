export interface IProduct {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  subcategoryId: number;
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

export interface IShoppingState {
  products: IProduct[];
  cart: ICart;
  categories: ICategory[];
  selectedCategoryId: number;
  selectedSubcategoryIds: number[];
  meta: {
    fetchingData: boolean;
    dataLoaded: boolean;
    error: string;
  }
}

export interface IShopServerResponse {
  categories: ICategory[];
  products: IProduct[];
}
