import * as React from 'react';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { receiptsRequest, receiptsSetFilter } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { receiptsDataSelector, isFetchingReceiptsSelector, isReceiptsDataLoadedSelector } from '../../state/selectors';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';
import { IReceiptDetailed } from '../../../Profile/interfaces';

import styles from './Receipts.module.css';

interface IReceiptsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  data: IReceiptDetailed[];
}

interface IReceiptsMappedDispatch {
  onReceiptsDataFetch: (tokenId: string) => void;
  onChangeReceiptUsername: (username: string) => void;
}

type IUsersDataProps = IReceiptsMappedProps & IReceiptsMappedDispatch;

export class ReceiptsComponent extends React.PureComponent<IUsersDataProps> {

  public componentDidMount() {
    if (!this.props.data.length || this.props.data.length === 0) {
      this.props.onReceiptsDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return (
      <div className={styles.TableContainer}>
        {this.props.isFetchinData
          ? <Spinner />
          : this.props.isDataLoaded && this.props.data.length === 0
            ? <p>NO DATA TO SHOW</p>
            : <ReceiptsTable
                data={this.props.data}
                showUsername={true}
              />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IReceiptsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingReceiptsSelector,
  isDataLoaded: isReceiptsDataLoadedSelector,
  data: receiptsDataSelector,
});

const mapDispatchToProps = {
  onReceiptsDataFetch: receiptsRequest,
  onChangeReceiptUsername: receiptsSetFilter,
}

export const Receipts = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
