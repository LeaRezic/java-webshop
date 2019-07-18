import { createSelector } from 'reselect';

import { IStore } from '../../../../state/store';
import { ILoginLog, IAdminViewFilter } from '../../interfaces';
import { getDateFromDisplayDateTime } from '../../../../utils/dateUtils';

export const isFetchingLogsSelector = (store: IStore): boolean => {
  return store.admin.logs.meta.fetching;
}

export const isLogDataLoadedSelector = (store: IStore): boolean => {
  return !store.admin.logs.meta.fetching;
}

const logDataSelector = (store: IStore): ILoginLog[] => {
  return store.admin.logs.data;
}

export const logsFilter = (store: IStore): IAdminViewFilter => {
  return store.admin.logs.filter;
}

export const filteredLogsSelector = createSelector(
  [logDataSelector, logsFilter],
  (logs: ILoginLog[], filter: IAdminViewFilter) => {
    let filteredLogs = [...logs];
    if (filter.username !== null) {
      filteredLogs = filteredLogs.filter((log) => log.username === filter.username);
    }
    if (filter.from !== null) {
      filteredLogs = filteredLogs.filter((log) => getDateFromDisplayDateTime(log.date) >= filter.from);
    }
    if (filter.to !== null) {
      filteredLogs = filteredLogs.filter((log) => getDateFromDisplayDateTime(log.date) <= filter.to);
    }
    return filteredLogs;
  }
);
