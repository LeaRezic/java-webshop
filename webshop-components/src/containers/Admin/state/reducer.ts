import { IAdminState, AdminViewType, IAdminViewMeta, IAdminUserData, ILoginLog, IAdminViewFilter } from '../interfaces';
import { AdminActionTypes, AdminActions } from './actions';
import { IReceiptDetailed } from '../../Profile/interfaces';

const initialMeta: IAdminViewMeta = {
  fetching: false,
  success: false,
  error: null,
}

const today = new Date();
const yearAgo = new Date();
yearAgo.setFullYear(yearAgo.getFullYear() - 1);

const initialFilter: IAdminViewFilter = {
  username: null,
  from: yearAgo,
  to: today,
}

const initialState: IAdminState = {
  activeView: AdminViewType.VIEW_USERS,
  users: {
    data: [],
    meta: { ...initialMeta },
  },
  logs: {
    data: [],
    filter: { ...initialFilter },
    meta:  { ...initialMeta },
  },
  receipts: {
    data: [],
    filter: { ...initialFilter },
    meta:  { ...initialMeta },
  }
}

const setAdminView = (state: IAdminState, view: AdminViewType): IAdminState => {
  return {
    ...state,
    activeView: view,
  };
}

const usersDataRequest = (state: IAdminState): IAdminState => {
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

const usersDataSuccess = (state: IAdminState, usersData: IAdminUserData[]): IAdminState => {
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

const usersDataFailure = (state: IAdminState, error: string): IAdminState => {
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

const loginLogsRequest = (state: IAdminState): IAdminState => {
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

const loginLogsSuccess = (state: IAdminState, logData: ILoginLog[]): IAdminState => {
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

const loginLogsFailure = (state: IAdminState, error: string): IAdminState => {
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

const loginLogsSetUsernameFilter = (state: IAdminState, username: string): IAdminState => {
  return {
    ...state,
    logs: {
      ...state.logs,
      filter: {
        ...state.logs.filter,
        username: username,
      }
    },
  };
}

const receiptsRequest = (state: IAdminState): IAdminState => {
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

const receiptsSuccess = (state: IAdminState, receipts: IReceiptDetailed[]): IAdminState => {
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

const receiptsFailure = (state: IAdminState, error: string): IAdminState => {
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

const receiptsSetUsernameFilter = (state: IAdminState, username: string): IAdminState => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      filter: {
        ...state.receipts.filter,
        username: username,
      }
    },
  };
}

const loginLogsSetDatesFilter = (state: IAdminState, dates: Date[]): IAdminState => {
  return {
    ...state,
    logs: {
      ...state.logs,
      filter: {
        ...state.logs.filter,
        from: dates[0],
        to: dates[1],
      },
    },
  };
}

const receiptsSetDatesFilter = (state: IAdminState, dates: Date[]): IAdminState => {
  return {
    ...state,
    receipts: {
      ...state.receipts,
      filter: {
        ...state.receipts.filter,
        from: dates[0],
        to: dates[1],
      },
    },
  };
}

const clearAdminData = (): IAdminState => {
  return {
    ...initialState
  };
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
    case AdminActionTypes.LOGIN_LOGS_SET_USERNAME_FILTER: return loginLogsSetUsernameFilter(state, action.data);
    case AdminActionTypes.LOGIN_LOGS_SET_DATES_FILTER: return loginLogsSetDatesFilter(state, action.data);
    case AdminActionTypes.RECEIPTS_REQUEST: return receiptsRequest(state);
    case AdminActionTypes.RECEIPTS_SUCCESS: return receiptsSuccess(state, action.data);
    case AdminActionTypes.RECEIPTS_FAILURE: return receiptsFailure(state, action.data);
    case AdminActionTypes.RECEIPTS_SET_USERNAME_FILTER: return receiptsSetUsernameFilter(state, action.data);
    case AdminActionTypes.RECEIPTS_SET_DATES_FILTER: return receiptsSetDatesFilter(state, action.data);
    case AdminActionTypes.CLEAR_ADMIN_DATA: return clearAdminData();
    default: return state;
  }
};
