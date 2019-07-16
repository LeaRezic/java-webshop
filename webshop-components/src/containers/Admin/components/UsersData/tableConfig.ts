import { CellType } from '../../../../components/Table/Cell';
import { IRowConfig } from '../../../../components/Table/interfaces';
import { IAdminUserData } from '../../interfaces';
import { changeIsoDateFormat } from '../../../../utils/dateUtils';

import styles from './UsersData.module.css';

export const getTableConfig = (
  onClickUserLogs: (username: string) => void,
  onClickUserReceipts: (username: string) => void
  ): IRowConfig<IAdminUserData> => [
    {
      accessor: (row: IAdminUserData) => row.username,
      openInNewTab: true,
      sortable: true,
      title: 'Username',
      weight: 19,
    },
    // {
    //   accessor: (row: IAdminUserData) => row.uuid,
    //   openInNewTab: true,
    //   sortable: true,
    //   title: 'UUID',
    //   weight: 18,
    // },
    {
      accessor: (row: IAdminUserData) => row.totalReceipts,
      openInNewTab: true,
      sortable: true,
      title: 'Total Receipts',
      weight: 17,
    },
    {
      accessor: (row: IAdminUserData) => row.userSince,
      sortable: true,
      title: 'User Since',
      formatter: (date: string) => changeIsoDateFormat(date.split(' ')[0]),
      weight: 16,
    },
    {
      accessor: (row: IAdminUserData) => row.lastLogin,
      sortable: true,
      title: 'Last Login',
      formatter: (date: string) => changeIsoDateFormat(date.split(' ')[0]),
      weight: 15,
    },
    {
      actions: [
        {
          className: styles.BtnDetails,
          onClick: (event: any, row: IAdminUserData, original: any) => {
            onClickUserLogs(row.username);
          },
          tooltip: 'View Logs',
          icon: 'fas fa-eye',
        },
        {
          className: styles.BtnDetails,
          onClick: (event: any, row: IAdminUserData, original: any) => {
            onClickUserReceipts(row.username);
          },
          tooltip: 'View Receipts',
          icon: 'fas fa-eye',
        },
      ],
        cellType: CellType.Actions,
        field: '',
        fixedWidth: true,
        title: 'Actions',
        weight: 18,
    },
];
