import { IAdminState, AdminViewType, IAdminViewMeta, IAdminUserData, ILoginLog } from '../interfaces';
import { AdminActionTypes, AdminActions } from './actions';
import { IReceiptDetailed } from '../../Profile/interfaces';
import { statement } from '@babel/template';

const initialMeta: IAdminViewMeta = {
  fetching: false,
  success: false,
  error: null,
}

const initialState: IAdminState = {
  activeView: AdminViewType.VIEW_USERS,
  users: {
    data: [],
    meta: { ...initialMeta },
  },
  logs: {
    usernameFilter: null,
    data: [],
    meta:  { ...initialMeta },
  },
  receipts: {
    usernameFilter: null,
    data: [],
    meta:  { ...initialMeta },
  }
}

const setAdminView = (state: IAdminState, view: AdminViewType) => {
  return {
    ...state,
    activeView: view,
  };
}

const usersDataRequest = (state: IAdminState) => {
  return {
    ...state,
    users: {
      ...state.users,
      meta: {
        ...state.users.meta,
        fetching: true,
      }
    }
  }
}

const usersDataSuccess = (state: IAdminState, usersData: IAdminUserData[]) => {
  return {
    ...state,
    users: {
      ...state.users,
      data: usersData,
      meta: {
        fetching: false,
        success: true,
        error: null,
      }
    }
  }
}

const usersDataFailure = (state: IAdminState, error: string) => {
  return {
    ...state,
    users: {
      ...state.users,
      data: [],
      meta: {
        fetching: false,
        success: false,
        error: error,
      }
    }
  }
}

const loginLogsRequest = (state: IAdminState) => {
  return {
    ...state,
    logs: {
      ...state.logs,
      meta: {
        ...state.logs.meta,
        fetching: true,
      }
    }
  }
}

const loginLogsSuccess = (state: IAdminState, logData: ILoginLog[]) => {
  return {
    ...state,
    logs: {
      ...state.logs,
      data: logData,
      meta: {
        fetching: false,
        success: true,
        error: null,
      }
    }
  }
}

const loginLogsFailure = (state: IAdminState, error: string) => {
  return {
    ...state,
    logs: {
      ...state.logs,
      data: [],
      meta: {
        fetching: false,
        success: false,
        error: error,
      }
    }
  }
}

const loginLogsSetFilter = (state: IAdminState, username: string) => {
  return {
    ...state,
    logs: {
      ...state.logs,
      usernameFilter: username,
    },
  };
}

const receiptsRequest = (state: IAdminState) => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      meta: {
        ...state.receipts.meta,
        fetching: true,
      }
    }
  }
}

const receiptsSuccess = (state: IAdminState, receipts: IReceiptDetailed[]) => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      data: receipts,
      meta: {
        fetching: false,
        success: true,
        error: null,
      }
    }
  }
}

const receiptsFailure = (state: IAdminState, error: string) => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      data: [],
      meta: {
        fetching: false,
        success: false,
        error: error,
      }
    }
  }
}

const receiptsSetFilter = (state: IAdminState, username: string) => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      usernameFilter: username,
    },
  };
}

const viewUserLogs = (state: IAdminState, username: string) => {
  return setAdminView(loginLogsSetFilter(state, username), AdminViewType.VIEW_LOGS);;
}

const viewUserReceipts = (state: IAdminState, username: string) => {
  return setAdminView(receiptsSetFilter(state, username), AdminViewType.VIEW_RECEIPTS);;
}

export const adminReducer = (state: IAdminState = initialState, action: AdminActions): IAdminState => {
  switch (action.type) {
    case AdminActionTypes.SET_ADMIN_VIEW: return setAdminView(state, action.data);
    case AdminActionTypes.USERS_DATA_REQUEST: return usersDataRequest(state);
    case AdminActionTypes.USERS_DATA_SUCCESS: return usersDataSuccess(state, action.data);
    case AdminActionTypes.USERS_DATA_FAILURE: return usersDataFailure(state, action.data);
    case AdminActionTypes.LOGIN_LOGS_REQUEST: return loginLogsRequest(state);
    case AdminActionTypes.LOGIN_LOGS_SUCCESS: return loginLogsSuccess(state, action.data);
    case AdminActionTypes.LOGIN_LOGS_FAILURE: return loginLogsFailure(state, action.data);
    case AdminActionTypes.LOGIN_LOGS_SET_FILTER: return loginLogsSetFilter(state, action.data);
    case AdminActionTypes.RECEIPTS_REQUEST: return receiptsRequest(state);
    case AdminActionTypes.RECEIPTS_SUCCESS: return receiptsSuccess(state, action.data);
    case AdminActionTypes.RECEIPTS_FAILURE: return receiptsFailure(state, action.data);
    case AdminActionTypes.RECEIPTS_SET_FILTER: return receiptsSetFilter(state, action.data);
    case AdminActionTypes.VIEW_USER_LOGS: return viewUserLogs(state, action.data);
    case AdminActionTypes.VIEW_USER_RECEIPTS: return viewUserReceipts(state, action.data);
    default: return state;
  }
};
