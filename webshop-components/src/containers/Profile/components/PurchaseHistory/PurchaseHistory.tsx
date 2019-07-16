import * as React from 'react';

import { IReceiptDetailed } from '../../interfaces';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';

import styles from './PurchaseHistory.module.css';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';

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
            ? <p>NO DATA TO SHOW, GO BUY SOME GAMES</p>
            : <ReceiptsTable
                data={this.props.receipts}
                showUsername={false}
              />
        }
      </div>
    );
  }
}
