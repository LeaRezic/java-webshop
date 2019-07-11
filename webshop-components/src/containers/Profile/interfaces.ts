export interface IReceiptItem {
  id: number;
  receiptId: number;
  productId: number;
  productName: string;
  productUrl: string;
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

export interface IProfileInfo {
  username: string;
  memberSince: string;
}

export interface IProfileState {
  profileInfo: IProfileInfo;
  receipts: IReceiptDetailed[];
  viewReceiptId: number;
  meta: {
    isRequestingHistory: boolean;
    historySuccess: boolean;
    historyError: string;
    isRequestingProfileInfo: boolean;
    profileInfoSuccess: boolean;
    profileInfoError: string;
  }
}
