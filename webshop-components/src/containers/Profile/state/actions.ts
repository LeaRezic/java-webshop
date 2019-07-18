import { IReduxAction } from '../../../typings/interfaces';

import { IReceiptDetailed } from '../interfaces';

export enum ProfileActionTypes {
  PURCHASE_HISTORY_REQUEST = 'PURCHASE_HISTORY_REQUEST',
  PURCHASE_HISTORY_SUCCESS = 'PURCHASE_HISTORY_SUCCESS',
  PURCHASE_HISTORY_FAILURE = 'PURCHASE_HISTORY_FAILURE',
  SET_USERNAME = 'SET_USERNAME',
  CLEAR_PROFILE = 'CLEAR_PROFILE',
}

export const purchaseHistoryRequest = (authTokenId: string)
  :IReduxAction<string, void, void, ProfileActionTypes.PURCHASE_HISTORY_REQUEST> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_REQUEST,
    data: authTokenId,
  };
}

export const purchaseHistorySuccess = (receipts: IReceiptDetailed[])
  :IReduxAction<IReceiptDetailed[], void, void, ProfileActionTypes.PURCHASE_HISTORY_SUCCESS> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_SUCCESS,
    data: receipts,
  };
}

export const purchaseHistoryFailure = (error: string)
  :IReduxAction<string, void, void, ProfileActionTypes.PURCHASE_HISTORY_FAILURE> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_FAILURE,
    data: error,
  };
}

export const setUsername = (username: string)
  :IReduxAction<string, void, void, ProfileActionTypes.SET_USERNAME> => {
  return {
    type: ProfileActionTypes.SET_USERNAME,
    data: username,
  };
}

export const clearProfile = ()
  :IReduxAction<string, void, void, ProfileActionTypes.CLEAR_PROFILE> => {
  return {
    type: ProfileActionTypes.CLEAR_PROFILE,
  };
}

export type ProfileActions =
  | ReturnType<typeof purchaseHistoryRequest>
  | ReturnType<typeof purchaseHistorySuccess>
  | ReturnType<typeof purchaseHistoryFailure>
  | ReturnType<typeof setUsername>
  | ReturnType<typeof clearProfile>
  ;
