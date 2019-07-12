import * as React from 'react';

import { IReceiptDetailed } from '../../interfaces';
import { Table } from '../../../../components/Table/Table';
import { getInstanceTableConfig } from './tableConfig';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';

import styles from './PurchaseHistory.module.css';

interface IPurchaseHistoryProps {
  receipts: IReceiptDetailed[];
  onViewItems: (receipt: IReceiptDetailed) => void;
}

export class PurchaseHistory extends React.PureComponent<IPurchaseHistoryProps> {
  public render() {
    return(
      <div className={styles.TableContainer}>
        { this.props.receipts.length > 0
          ? <Table columns={getInstanceTableConfig(this.props.onViewItems)} data={this.props.receipts} foldableColumns={true} />
          : <Spinner/> }
      </div>
    );
  }
}