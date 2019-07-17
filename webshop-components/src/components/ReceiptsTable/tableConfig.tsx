import React from 'react';
import classNames from 'classnames';

import { IReceiptDetailed } from '../../containers/Profile/interfaces';
import { changeIsoDateFormat } from '../../utils/dateUtils';
import { getFormattedCurrency } from '../../utils/currencyUtil';

import styles from './ReceiptsTable.module.css';

export const getTableConfig = (
  showUsername: boolean,
  onViewDetails: (receipt: IReceiptDetailed) => void) => {
  const config = [
    {
      Header: 'User',
      id: '1',
      accessor: (row: IReceiptDetailed) => row.username,
      sortable: true,
    },
    {
      Header: 'Date',
      id: '2',
      accessor: (row: IReceiptDetailed) => row.basic.purchaseDate,
      sortable: true,
      Cell: (props) => changeIsoDateFormat(props.value.split(' ')[0]),
    },
    {
      Header: 'Number',
      id: '3',
      accessor: (row: IReceiptDetailed) => row.basic.number,
      sortable: true,
    },
    {
      Header: 'Amount',
      id: '4',
      accessor: (row: IReceiptDetailed) => row.basic.amount,
      sortable: true,
      Cell: (props) => getFormattedCurrency(props.value),
    },
    {
      Header: 'Items Total',
      id: '5',
      accessor: (row: IReceiptDetailed) => row.basic.totalProducts,
      sortable: true,
    },
    {
      Header: 'PayPal',
      id: '6',
      accessor: (row: IReceiptDetailed) => row.basic.creditCard,
      sortable: true,
      className: styles.CreditCard,
      Cell: (props) => props.value ? <span className={classNames(styles.Icon, 'fas fa-check')} /> : null,
    },
    {
      Header: 'Actions',
      id: '7',
      Cell: (props) => {
        return (
          <span
            className={classNames('fas fa-eye', styles.BtnDetails)}
            onClick={(e: any) => {
              e.preventDefault();
              onViewDetails(props.original);
            }}
          />
        );
      }
    },
  ];
  if (!showUsername) {
    config.shift();
  }
  return config;
}
