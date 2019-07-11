import { IReduxAction } from '../../../types/interfaces';

import { IReceiptDetailed, IProfileInfo } from '../interfaces';

export enum ProfileActionTypes {
  PURCHASE_HISTORY_REQUEST = 'PURCHASE_HISTORY_REQUEST',
  PURCHASE_HISTORY_SUCCESS = 'PURCHASE_HISTORY_SUCCESS',
  PURCHASE_HISTORY_FAILURE = 'PURCHASE_HISTORY_FAILURE',
  PROFILE_DETAILS_REQUEST = 'PROFILE_DETAILS_REQUEST',
  PROFILE_DETAILS_SUCCESS = 'PROFILE_DETAILS_SUCCESS',
  PROFILE_DETAILS_FAILURE = 'PROFILE_DETAILS_FAILURE',
}

export const purchaseHistoryRequest = (authTokenId: string)
  : IReduxAction<string, void, void, ProfileActionTypes.PURCHASE_HISTORY_REQUEST> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_REQUEST,
    data: authTokenId,
  };
}

export const purchaseHistorySuccess = (receipts: IReceiptDetailed[])
  : IReduxAction<IReceiptDetailed[], void, void, ProfileActionTypes.PURCHASE_HISTORY_SUCCESS> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_SUCCESS,
    data: receipts,
  };
}

export const purchaseHistoryFailure = (error: string)
  : IReduxAction<string, void, void, ProfileActionTypes.PURCHASE_HISTORY_FAILURE> => {
  return {
    type: ProfileActionTypes.PURCHASE_HISTORY_FAILURE,
    data: error,
  };
}

export const profileDetailsRequest = (authTokenId: string)
  : IReduxAction<string, void, void, ProfileActionTypes.PROFILE_DETAILS_REQUEST> => {
  return {
    type: ProfileActionTypes.PROFILE_DETAILS_REQUEST,
    data: authTokenId,
  };
}

export const profileDetailsSuccess = (profileInfo: IProfileInfo)
  : IReduxAction<IProfileInfo, void, void, ProfileActionTypes.PROFILE_DETAILS_SUCCESS> => {
  return {
    type: ProfileActionTypes.PROFILE_DETAILS_SUCCESS,
    data: profileInfo,
  };
}

export const profileDetailsFailure = (error: string)
  : IReduxAction<string, void, void, ProfileActionTypes.PROFILE_DETAILS_FAILURE> => {
  return {
    type: ProfileActionTypes.PROFILE_DETAILS_FAILURE,
    data: error,
  };
}


export type ProfileActions =
  | ReturnType<typeof purchaseHistoryRequest>
  | ReturnType<typeof purchaseHistorySuccess>
  | ReturnType<typeof purchaseHistoryFailure>
  | ReturnType<typeof profileDetailsRequest>
  | ReturnType<typeof profileDetailsSuccess>
  | ReturnType<typeof profileDetailsFailure>
  ;
