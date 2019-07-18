import * as React from 'react';

import { IReceiptDetailed } from '../../interfaces';
import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';
import { NoData } from '../../../../components/UI/NoData/NoData';
import { Aux } from '../../../../hoc/Aux/Aux';
import { getErrorDisplay } from '../../../../utils/errorDisplayUtil';

import styles from './PurchaseHistory.module.css';
import globalStyles from '../../../../style/GlobalStyle.module.css';

interface IPurchaseHistoryProps {
  isLoadingData: boolean;
  isDataLoaded: boolean;
  receipts: IReceiptDetailed[];
  error: string;
}

export class PurchaseHistory extends React.PureComponent<IPurchaseHistoryProps> {
  public render() {
    return(
      <div className={styles.TableContainer}>
        { this.props.isLoadingData
          ? <Spinner />
          : this.props.isDataLoaded && this.props.receipts.length > 0
            ? <ReceiptsTable
                data={this.props.receipts}
                showUsername={false}
              />
            : <Aux>
                <NoData />
                {this.props.error !== null
                  ? <div className={globalStyles.GrimzonBold}>{getErrorDisplay(this.props.error)}</div>
                  : null}
              </Aux>
        }
      </div>
    );
  }
}
