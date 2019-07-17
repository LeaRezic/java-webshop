import React from 'react';
import classNames from 'classnames';

import { IAdminUserData } from '../../interfaces';
import { changeIsoDateFormat } from '../../../../utils/dateUtils';

import styles from './UsersData.module.css';

export const getTableConfig = (
  onClickUserLogs: (username: string) => void,
  onClickUserReceipts: (username: string) => void) => [
    {
      Header: 'Username',
      id: '0',
      accessor: (row: IAdminUserData) => row.username,
      sortable: true,
    },
    {
      Header: 'Total Receipts',
      id: '1',
      accessor: (row: IAdminUserData) => row.totalReceipts,
      sortable: true,
    },
    {
      Header: 'User Since',
      id: '2',
      accessor: (row: IAdminUserData) => row.userSince,
      sortable: true,
      Cell: (props) => changeIsoDateFormat(props.value.split(' ')[0]),
    },
    {
      Header: 'Last Login',
      id: '3',
      accessor: (row: IAdminUserData) => row.lastLogin,
      sortable: true,
      Cell: (props) => changeIsoDateFormat(props.value.split(' ')[0]),
    },
    {
      Header: 'Logs',
      id: '4',
      Cell: (props) => (
        <span
          className={classNames('fas fa-eye', styles.BtnDetails)}
          onClick={(e: any) => {
            e.preventDefault();
            onClickUserLogs(props.original.username);
          }}
        />
      ),
    },
    {
      Header: 'Receipts',
      id: '5',
      Cell: (props) => (
        <span
          className={classNames('fas fa-eye', styles.BtnDetails)}
          onClick={(e: any) => {
            e.preventDefault();
            onClickUserReceipts(props.original.username);
          }}
        />
      ),
    },
];
