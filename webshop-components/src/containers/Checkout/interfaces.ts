export enum PaymentMethod {
  CASH = 'CASH',
  PAY_PAL = 'PAY_PAL',
}

export interface ICheckoutState {
  receiptNumber: string;
  paymentMethod: PaymentMethod;
  meta: {
    isRequestingReceiptCreate: boolean;
    receiptCreatedSuccess: boolean;
    receiptCreatedError: string;
    shouldRedirectToProfile: boolean;
  }
}

export interface ICreateReceiptItem {
  productId: number;
  ammount: number;
}

export interface ICreateReceiptRequest {
  tokenId: string;
  username?: string;
  password?: string;
  paymentMethod: PaymentMethod;
  items: ICreateReceiptItem[];
}
