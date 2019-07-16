import { ICheckoutState, PaymentMethod } from '../interfaces';
import { CheckoutActionTypes, CheckoutActions } from './actions';

const initialState: ICheckoutState = {
  receiptNumber: null,
  paymentMethod: PaymentMethod.CASH,
  meta: {
    isRequestingReceiptCreate: false,
    receiptCreatedSuccess: false,
    receiptCreatedError: null,
    shouldRedirectToProfile: false,
  }
}

const createReceiptRequest = (state: ICheckoutState): ICheckoutState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingReceiptCreate: true,
    }
  }
}

const createReceiptSuccess = (state: ICheckoutState, receiptNumber: string): ICheckoutState => {
  return {
    ...state,
    receiptNumber: receiptNumber,
    meta: {
      ...state.meta,
      isRequestingReceiptCreate: false,
      receiptCreatedSuccess: true,
      receiptCreatedError: null,
      shouldRedirectToProfile: true,
    }
  }
}

const createReceiptFailure = (state: ICheckoutState, error: string): ICheckoutState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingReceiptCreate: false,
      receiptCreatedSuccess: false,
      receiptCreatedError: error,
      shouldRedirectToProfile: false,
    }
  }
}

const setPaymentMethod = (state: ICheckoutState, method: PaymentMethod): ICheckoutState => {
  return {
    ...state,
    paymentMethod: method,
  }
}

const stopRedirectToProfile = (state: ICheckoutState): ICheckoutState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      shouldRedirectToProfile: false,
    }
  }
}

const clearError = (state: ICheckoutState): ICheckoutState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      receiptCreatedError: null,
    }
  }
}

export const checkoutReducer = (state: ICheckoutState = initialState, action: CheckoutActions): ICheckoutState => {
  switch (action.type) {
    case CheckoutActionTypes.CREATE_RECEIPT_REQUEST: return createReceiptRequest(state);
    case CheckoutActionTypes.CREATE_RECEIPT_SUCCESS: return createReceiptSuccess(state, action.data);
    case CheckoutActionTypes.CREATE_RECEIPT_FAILURE: return createReceiptFailure(state, action.data);
    case CheckoutActionTypes.SET_PAYMENT_METHOD: return setPaymentMethod(state, action.data);
    case CheckoutActionTypes.STOP_REDIRECT_TO_PROFILE: return stopRedirectToProfile(state);
    case CheckoutActionTypes.CLEAR_ERROR: return clearError(state);
    default: return state;
  }
};
