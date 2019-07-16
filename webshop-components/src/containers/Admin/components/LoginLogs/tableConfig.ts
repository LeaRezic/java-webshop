import { IRowConfig } from '../../../../components/Table/interfaces';
import { ILoginLog } from '../../interfaces';
import { changeIsoDateFormat } from '../../../../utils/dateUtils';

import styles from './LoginLogs.module.css';

export const getTableConfig = (): IRowConfig<ILoginLog> => [
  {
    accessor: (row: ILoginLog) => row.username,
    openInNewTab: true,
    sortable: true,
    title: 'Username',
    weight: 19,
  },
  {
    accessor: (row: ILoginLog) => row.ipAddress,
    openInNewTab: true,
    sortable: true,
    title: 'IP Address',
    weight: 17,
  },
  {
    accessor: (row: ILoginLog) => row.date,
    sortable: true,
    title: 'Date',
    formatter: (date: string) => changeIsoDateFormat(date.split(' ')[0]),
    weight: 16,
  },
];
