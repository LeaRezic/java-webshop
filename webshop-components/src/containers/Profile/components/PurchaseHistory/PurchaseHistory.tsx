import * as React from 'react';

import { IReceiptDetailed } from '../../interfaces';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';
import { NoData } from '../../../../components/UI/NoData/NoData';

import styles from './PurchaseHistory.module.css';

interface IPurchaseHistoryProps {
  isLoadingData: boolean;
  isDataLoaded: boolean;
  receipts: IReceiptDetailed[];
}

export class PurchaseHistory extends React.PureComponent<IPurchaseHistoryProps> {
  public render() {
    return(
      <div className={styles.TableContainer}>
        { this.props.isLoadingData
          ? <Spinner />
          : this.props.isDataLoaded && this.props.receipts.length === 0
            ? <NoData />
            : <ReceiptsTable
                data={this.props.receipts}
                showUsername={false}
              />
        }
      </div>
    );
  }
}
