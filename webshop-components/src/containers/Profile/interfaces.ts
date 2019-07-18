export interface IReceiptItem {
  id: number;
  receiptId: number;
  productId: number;
  productName: string;
  pictureUrl: string;
  productPrice: number;
  amount: number;
};

export interface IReceiptBasic {
  id: number;
  number: string;
  creditCard: boolean;
  purchaseDate: string;
  totalProducts: number;
  amount: number;
};

export interface IReceiptDetailed {
  username: string;
  basic: IReceiptBasic;
  items: IReceiptItem[];
};

export interface IProfileState {
  username: string;
  receipts: IReceiptDetailed[];
  viewReceiptId: number;
  meta: {
    fetchingData: boolean;
    dataLoaded: boolean;
    error: string;
  }
}
