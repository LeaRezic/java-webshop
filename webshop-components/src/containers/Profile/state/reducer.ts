import {
  IProfileState,
  IReceiptDetailed,
} from '../interfaces';
import {
  ProfileActionTypes,
  ProfileActions,
} from './actions';

const initialState: IProfileState = {
  username: null,
  receipts: [],
  viewReceiptId: 0,
  meta: {
    fetchingData: false,
    dataLoaded: false,
    error: null,
  }
}

const purchaseHistoryRequest = (state: IProfileState): IProfileState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingData: true,
      dataLoaded: false,
      error: null,
    }
  }
}

const purchaseHistorySuccess = (state: IProfileState, receipts: IReceiptDetailed[]): IProfileState => {
  return {
    ...state,
    receipts: receipts,
    meta: {
      ...state.meta,
      fetchingData: false,
      dataLoaded: true,
      error: null,
    }
  }
}

const purchaseHistoryFailure = (state: IProfileState, error: string): IProfileState => {
  return {
    ...state,
    meta: {
      ...state.meta,
      fetchingData: false,
      dataLoaded: false,
      error: error,
    }
  }
}

const setUsername = (state: IProfileState, username: string): IProfileState => {
  return {
    ...state,
    username: username,
  }
}

const clearProfile = (state: IProfileState): IProfileState => {
  return {
    ...initialState,
  }
}

export const profileReducer = (state: IProfileState = initialState, action: ProfileActions): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.PURCHASE_HISTORY_REQUEST: return purchaseHistoryRequest(state);
    case ProfileActionTypes.PURCHASE_HISTORY_SUCCESS: return purchaseHistorySuccess(state, action.data);
    case ProfileActionTypes.PURCHASE_HISTORY_FAILURE: return purchaseHistoryFailure(state, action.data);
    case ProfileActionTypes.SET_USERNAME: return setUsername(state, action.data);
    case ProfileActionTypes.CLEAR_PROFILE: return clearProfile(state);
    default: return state;
  }
};
