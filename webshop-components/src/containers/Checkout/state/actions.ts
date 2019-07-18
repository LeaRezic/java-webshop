import { IReduxAction } from '../../../typings/interfaces';
import {
  PaymentMethod,
  ICreateReceiptRequest,
} from '../interfaces';

export enum CheckoutActionTypes {
  CREATE_RECEIPT_REQUEST = 'CREATE_RECEIPT_REQUEST',
  CREATE_RECEIPT_SUCCESS = 'CREATE_RECEIPT_SUCCESS',
  CREATE_RECEIPT_FAILURE = 'CREATE_RECEIPT_FAILURE',
  SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD',
  STOP_REDIRECT_TO_PROFILE = 'STOP_REDIRECT_TO_PROFILE',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export const createReceiptRequest = (receiptRequestData: ICreateReceiptRequest)
  :IReduxAction<ICreateReceiptRequest, void, void, CheckoutActionTypes.CREATE_RECEIPT_REQUEST> => {
  return {
    type: CheckoutActionTypes.CREATE_RECEIPT_REQUEST,
    data: receiptRequestData,
  };
}

export const createReceiptSuccess = (receiptNumber: string)
  :IReduxAction<string, void, void, CheckoutActionTypes.CREATE_RECEIPT_SUCCESS> => {
  return {
    type: CheckoutActionTypes.CREATE_RECEIPT_SUCCESS,
    data: receiptNumber,
  };
}

export const createReceiptFailure = (error: string)
  :IReduxAction<string, void, void, CheckoutActionTypes.CREATE_RECEIPT_FAILURE> => {
  return {
    type: CheckoutActionTypes.CREATE_RECEIPT_FAILURE,
    data: error,
  };
}

export const setPaymentMethod = (paymentMethod: PaymentMethod)
  :IReduxAction<PaymentMethod, void, void, CheckoutActionTypes.SET_PAYMENT_METHOD> => {
  return {
    type: CheckoutActionTypes.SET_PAYMENT_METHOD,
    data: paymentMethod,
  };
}

export const stopRedirectToProfile = ()
  :IReduxAction<void, void, void, CheckoutActionTypes.STOP_REDIRECT_TO_PROFILE> => {
  return {
    type: CheckoutActionTypes.STOP_REDIRECT_TO_PROFILE,
  };
}

export const clearError = ()
  :IReduxAction<void, void, void, CheckoutActionTypes.CLEAR_ERROR> => {
  return {
    type: CheckoutActionTypes.CLEAR_ERROR,
  };
}

export type CheckoutActions =
  | ReturnType<typeof createReceiptRequest>
  | ReturnType<typeof createReceiptSuccess>
  | ReturnType<typeof createReceiptFailure>
  | ReturnType<typeof setPaymentMethod>
  | ReturnType<typeof stopRedirectToProfile>
  | ReturnType<typeof clearError>
;
