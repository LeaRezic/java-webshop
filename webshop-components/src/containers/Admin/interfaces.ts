import { IReceiptDetailed } from '../Profile/interfaces';

export enum AdminViewType {
  VIEW_USERS = 'VIEW_USERS',
  VIEW_LOGS = 'VIEW_LOGS',
  VIEW_RECEIPTS = 'VIEW_RECEIPTS',
}

export interface IAdminUserData {
  username: string;
  // uuid: string;
  totalReceipts: number;
  userSince: string;
  lastLogin: string;
}

export interface ILoginLog {
  id: number;
  ipAddress: string;
  username: string;
  date: string;
  register: boolean;
}

export interface IAdminViewMeta {
  fetching: boolean;
  success: boolean;
  error: string;
}

export interface IAdminState {
  activeView: AdminViewType;
  users: {
    data: IAdminUserData[];
    meta: IAdminViewMeta;
  }
  logs: {
    usernameFilter: string;
    data: ILoginLog[];
    meta: IAdminViewMeta;
  };
  receipts: {
    usernameFilter: string;
    data: IReceiptDetailed[];
    meta: IAdminViewMeta;
  };
}
