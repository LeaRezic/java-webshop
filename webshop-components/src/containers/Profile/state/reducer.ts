import { IProfileState, IReceiptDetailed, IProfileInfo } from '../interfaces';
import { ProfileActionTypes, ProfileActions } from './actions';

const initialState: IProfileState = {
  profileInfo: {
    username: '',
    memberSince: '',
  },
  receipts: [],
  viewReceiptId: 0,
  meta: {
    isRequestingHistory: false,
    historySuccess: false,
    historyError: '',
    isRequestingProfileInfo: false,
    profileInfoSuccess: false,
    profileInfoError: '',
  }
}

const purchaseHistoryRequest = (state: IProfileState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingHistory: true,
    }
  }
}

const purchaseHistorySuccess = (state: IProfileState, receipts: IReceiptDetailed[]) => {
  return {
    ...state,
    receipts: receipts,
    meta: {
      ...state.meta,
      isRequestingHistory: false,
      historySuccess: true,
    }
  }
}

const purchaseHistoryFailure = (state: IProfileState, error: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingHistory: false,
      historySuccess: false,
      historyError: error,
    }
  }
}

const profileDetailsRequest = (state: IProfileState) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingRegister: true,
    }
  }
}

const profileDetailsSuccess = (state: IProfileState, profileInfo: IProfileInfo) => {
  return {
    ...state,
    profileInfo: profileInfo,
    meta: {
      ...state.meta,
      isRequestingProfileInfo: false,
      profileInfoSuccess: true,
    }
  }
}

const profileDetailsFailure = (state: IProfileState, error: string) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      isRequestingProfileInfo: false,
      profileInfoSuccess: false,
      profileInfoError: error,
    }
  }
}

export const profileReducer = (state: IProfileState = initialState, action: ProfileActions): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.PURCHASE_HISTORY_REQUEST: return purchaseHistoryRequest(state);
    case ProfileActionTypes.PURCHASE_HISTORY_SUCCESS: return purchaseHistorySuccess(state, action.data!);
    case ProfileActionTypes.PURCHASE_HISTORY_FAILURE: return purchaseHistoryFailure(state, action.data!);
    case ProfileActionTypes.PROFILE_DETAILS_REQUEST: return profileDetailsRequest(state);
    case ProfileActionTypes.PROFILE_DETAILS_SUCCESS: return profileDetailsSuccess(state, action.data!);
    case ProfileActionTypes.PROFILE_DETAILS_FAILURE: return profileDetailsFailure(state, action.data!);
    default: return state;
  }
};
