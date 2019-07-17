import * as React from 'react';

import { Spinner } from '../../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { receiptsRequest, receiptsSetFilter } from '../../state/actions';
import { authTokenSelector } from '../../../Auth/state/selectors';
import { receiptsDataSelector, isFetchingReceiptsSelector, isReceiptsDataLoadedSelector, logsSelectedUsersSelector, usersDataSelector, receiptsSelectedUsersSelector } from '../../state/selectors';
import { ReceiptsTable } from '../../../../components/ReceiptsTable/ReceiptsTable';
import { IReceiptDetailed } from '../../../Profile/interfaces';

import styles from './Receipts.module.css';
import { Aux } from '../../../../hoc/Aux/Aux';
import { UsersSelect } from '../UsersSelect/UsersSelect';
import { IAdminUserData } from '../../interfaces';
import { NoData } from '../../../../components/UI/NoData/NoData';

interface IReceiptsMappedProps {
  tokenId: string;
  isFetchinData: boolean;
  isDataLoaded: boolean;
  receiptsData: IReceiptDetailed[];
  usersData: IAdminUserData[];
  selectedUsers: IAdminUserData[];
}

interface IReceiptsMappedDispatch {
  onReceiptsDataFetch: (tokenId: string) => void;
  onChangeReceiptUsername: (username: string) => void;
  onSetFilter: (username: string) => void;
}

type IUsersDataProps = IReceiptsMappedProps & IReceiptsMappedDispatch;

export class ReceiptsComponent extends React.PureComponent<IUsersDataProps> {

  public componentDidMount() {
    if (!this.props.receiptsData.length || this.props.receiptsData.length === 0) {
      this.props.onReceiptsDataFetch(this.props.tokenId);
    }
  }

  public render() {
    return (
      <div className={styles.TableContainer}>
        {this.props.isFetchinData
          ? <Spinner />
          : <Aux>
            <div className={styles.SelectContainer}>
              <UsersSelect
                selectedUsers={this.props.selectedUsers}
                users={this.props.usersData}
                onChange={this.props.onSetFilter}
              />
            </div>
            {this.props.isDataLoaded && this.props.receiptsData.length === 0
              ? <NoData />
              : <ReceiptsTable
                  data={this.props.receiptsData}
                  showUsername={true}
                />}
          </Aux>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<any, IReceiptsMappedProps>({
  tokenId: authTokenSelector,
  isFetchinData: isFetchingReceiptsSelector,
  isDataLoaded: isReceiptsDataLoadedSelector,
  receiptsData: receiptsDataSelector,
  usersData: usersDataSelector,
  selectedUsers: receiptsSelectedUsersSelector,
});

const mapDispatchToProps = {
  onReceiptsDataFetch: receiptsRequest,
  onChangeReceiptUsername: receiptsSetFilter,
  onSetFilter: receiptsSetFilter,
}

export const Receipts = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
