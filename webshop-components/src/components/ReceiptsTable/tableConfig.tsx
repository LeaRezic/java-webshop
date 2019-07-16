import React from 'react';
import classNames from 'classnames';

import { CellType } from '../Table/Cell';
import { IRowConfig } from '../Table/interfaces';
import { IReceiptDetailed } from '../../containers/Profile/interfaces';
import { changeIsoDateFormat } from '../../utils/dateUtils';

import styles from './ReceiptsTable.module.css';
import { getFormattedCurrency } from '../../utils/currencyUtil';

export const getTableConfig = (
  showUsername: boolean,
  onViewDetails: (receipt: IReceiptDetailed) => void)
  :IRowConfig<IReceiptDetailed> => {
  const config = [
    {
      accessor: (row: IReceiptDetailed) => row.username,
      openInNewTab: true,
      sortable: true,
      title: 'User',
      weight: 20,
    },
    {
      accessor: (row: IReceiptDetailed) => row.basic.purchaseDate,
      openInNewTab: true,
      sortable: true,
      title: 'Date',
      formatter: (date: string) => changeIsoDateFormat(date.split(' ')[0]),
      weight: 19,
    },
    {
      accessor: (row: IReceiptDetailed) => row.basic.number,
      openInNewTab: true,
      sortable: true,
      title: 'Number',
      weight: 18,
    },
    {
      accessor: (row: IReceiptDetailed) => row.basic.amount,
      openInNewTab: true,
      sortable: true,
      title: 'Amount',
      formatter: (amount: number) => getFormattedCurrency(amount),
      weight: 17,
    },
    {
      accessor: (row: IReceiptDetailed) => row.basic.totalProducts,
      sortable: true,
      title: 'Items Total',
      weight: 16,
    },
    {
      accessor: (row: IReceiptDetailed) => row.basic.creditCard,
      sortable: true,
      title: 'Paid by Card',
      className: styles.CreditCard,
      formatter: (isCreditCard: boolean) => isCreditCard ? <span className={classNames(styles.Icon, 'fas fa-check')} /> : null,
      weight: 15,
    },
    {
      actions: [
        {
          className: styles.BtnDetails,
          onClick: (event: any, row: IReceiptDetailed, original: any) => {
            onViewDetails(row);
          },
          tooltip: 'View Details',
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
  if (!showUsername) {
    config.shift();
  }
  return config;
}
